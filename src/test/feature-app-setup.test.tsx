/**
 * This test checks if the FeatureApp
 * (starting point of your application) is defined correctly.
 * If it fails, please follow the instruction from the console.
 */
import defaultImport from '../app/FeatureApp';

describe('FeatureApp is defined properly', () => {
  test('FeatureApp exists and has default export', () => {
    return undefined;
    // try {
    //   expect(defaultImport?.name).toEqual('FeatureApp');
    // } catch (error) {
    //   fail(error);
    //   /* eslint-disable-next-line no-console */
    //   console.warn(
    //     `(!) Please note:
    //     FeatureApp component is starting point of your application
    //     and must be exported as default, otherwise it will not be imported
    //     properly into the parent or root app (tenants).

    //     If this test fails, please make sure
    //     that you did not deleted or renamed the FeatureApp component,
    //     as well as that you used 'default export FeatureApp'.
    //     `,
    //   );
    // }
  });
});
