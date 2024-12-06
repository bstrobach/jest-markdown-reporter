import type { Reporter, TestContext } from '@jest/reporters';
import type { AggregatedResult, AssertionResult } from '@jest/test-result';
import { FailingTest, GroupedFailingTests } from './failing-test';

class MarkdownSummaryReporter implements Reporter {
  onRunComplete(
    _testContexts: Set<TestContext>,
    results: AggregatedResult
  ): void {
    const failingTests = this.getFailingTests(results);

    if (failingTests.length === 0) {
      console.log('No failing tests.');
      return;
    }

    const markdown = this.generateMarkdown(failingTests);
    console.log(markdown);
  }

  private getFailingTests(results: AggregatedResult): FailingTest[] {
    const failing: FailingTest[] = [];

    for (const testFileResult of results.testResults) {
      const failures = testFileResult.testResults.filter(
        (tr: AssertionResult) => tr.status === 'failed'
      );

      for (const fail of failures) {
        failing.push({
          filePath: testFileResult.testFilePath,
          testName: fail.fullName,
          errorMessage: fail.failureMessages.join('\n\n'),
          stack: fail.failureDetails
            .map((detail) =>
              typeof detail === 'string'
                ? detail
                : JSON.stringify(detail, null, 2)
            )
            .join('\n'),
        });
      }
    }

    return failing;
  }

  private generateMarkdown(failingTests: FailingTest[]): string {
    const groupedByFile: GroupedFailingTests = failingTests.reduce(
      (acc, curr) => {
        acc[curr.filePath] = acc[curr.filePath] || [];
        acc[curr.filePath].push(curr);
        return acc;
      },
      {} as GroupedFailingTests
    );

    const lines: string[] = [];
    lines.push('## Test Failures');
    lines.push('');
    lines.push('<details>');
    lines.push('<summary>Click to expand failing tests</summary>');
    lines.push('');

    for (const [filePath, failures] of Object.entries(groupedByFile)) {
      lines.push(`### ${filePath}`);
      lines.push('');
      for (const fail of failures) {
        lines.push(`- **Test Name:** ${fail.testName}`);
        lines.push('');
        lines.push('**Error Message:**');
        lines.push('');
        lines.push('```');
        lines.push(fail.errorMessage.trim());
        lines.push('```');

        if (fail.stack) {
          lines.push('');
          lines.push('**Stack Trace:**');
          lines.push('');
          lines.push('```');
          lines.push(fail.stack.trim());
          lines.push('```');
        }

        lines.push('');
      }
      lines.push('---');
      lines.push('');
    }

    lines.push('</details>');
    lines.push('');

    return lines.join('\n');
  }
}

export default MarkdownSummaryReporter;
