import { jestMdReporter } from './jest-md-reporter';

describe('jestMdReporter', () => {
  it('should work', () => {
    expect(jestMdReporter()).toEqual('jest-md-reporter');
  });
});
