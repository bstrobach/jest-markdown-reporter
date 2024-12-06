# jest-markdown-reporter

[![npm version](https://img.shields.io/npm/v/jest-markdown-reporter.svg)](https://www.npmjs.com/package/jest-markdown-reporter)
[![npm downloads](https://img.shields.io/npm/dm/jest-markdown-reporter.svg)](https://www.npmjs.com/package/jest-markdown-reporter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE.md)

**Jest Markdown Reporter** is a custom Jest reporter that summarizes failing tests into a neatly formatted Markdown block. This can be especially useful for posting test summaries in GitHub, GitLab, or other review platforms as comments.

## Features

- **Markdown Summaries**: All failing tests are grouped by file, with each failure including:
  - Test name
  - Error message
  - Stack trace (if available)
- **Expandable Sections**: Uses `<details>` tags to allow collapsible sections for easier navigation of test failures.
- **CI/CD Integration**: Easily integrate with CI pipelines to automatically post failing test summaries in PR comments.

## Installation

```bash
npm install --save-dev jest-markdown-reporter
```

## Usage

1. **Add to Jest Configuration:**

   In your `jest.config.js` or `jest.config.ts`, add the reporter:

   ```javascript
   module.exports = {
     reporters: ['default', ['jest-markdown-reporter', {}]],
   };
   ```

   **Note:** The `default` reporter is optional if you still want Jest's standard output. If you'd like only the Markdown summary, omit `'default'`.

2. **Run Tests:**

   Run Jest as usual:

   ```bash
   npx jest
   ```

   If any tests fail, a Markdown summary will be printed to the console. You can then copy and paste this summary into your Pull Request or Merge Request comment.

### Example Output

When tests fail, you'll see something like [this](./example-output.md).

This markdown can then be pasted into a GitHub/GitLab/Gitea PR comment, where it will be nicely formatted and expandable.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository and clone your fork.
2. Create a new branch for your feature or bugfix.
3. Make your changes, including tests if possible.
4. Run all tests to ensure your changes don't break existing functionality.
   ```bash
   npx nx test jest-markdown-reporter
   ```
5. Submit a Pull Request describing your changes.

## License

This project is licensed under the [MIT License](./LICENSE). Feel free to use, modify, and distribute this project as per the terms of the license.
