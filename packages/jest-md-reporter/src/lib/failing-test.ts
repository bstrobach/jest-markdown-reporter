export interface FailingTest {
  filePath: string;
  testName: string;
  errorMessage: string;
  stack?: string;
}

export type GroupedFailingTests = Record<string, FailingTest[]>;
