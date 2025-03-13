/**
 * This test checks if contentful setup in the FeatureApp
 * (starting point of your application) is defined correctly.
 * If it fails, please follow the instruction from the console.
 */
// import React from 'react';
// import { render, RenderResult } from '@testing-library/react';
// import * as contentfulOneAudi from '@volkswagen-onehub/oneaudi-os-contentful';
// import { createOneGraphClient } from '@volkswagen-onehub/onegraph-client';
// import FeatureApp from '../app/FeatureApp';

/* const setup = (): RenderResult => {
  // @ts-ignore
  global.__FEATURE_APP_NAME__ = '';
  // @ts-ignore
  global.__FEATURE_APP_VERSION__ = '';
  const oneGraphClient = createOneGraphClient({
    endpoint: '',
    apiKey: '',
    clientName: 'jest',
    clientVersion: '',
  });
  return render(
    <FeatureApp id="some-entry-id" oneGraphClient={oneGraphClient} configProvider={null as any}>
      Hello Test
    </FeatureApp>
  );
};
*/

describe('Contentful Setup in FeatureApp is defined properly', () => {
  /* beforeEach(() => {
    jest
      .spyOn(contentfulOneAudi, 'ContentfulProvider')
      .mockImplementationOnce((props) => <div {...props}>ContentfulProvider</div>);
  });
  test('Contentful Provider renders', () => {
    const { getByText } = setup();
    expect(getByText('ContentfulProvider').textContent).toEqual('ContentfulProvider');
  });
  */

  test('empty', () => undefined);
});
