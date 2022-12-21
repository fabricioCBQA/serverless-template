import { testHandler } from 'index'

describe('[testHandler]', () => {
  it('should not crash', async () => {
    await testHandler({}, {});
  });
});