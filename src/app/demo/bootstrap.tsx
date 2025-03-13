import { ThemeProvider } from '@audi/audi-ui-react';
import { renderDemo, React, FeatureAppContainer } from '@oneaudi/static-demo-integrator';
import featureAppDefinition from '../FeatureHubAppDefinition';

renderDemo(
  <ThemeProvider theme={{ iconBasePath: 'icons' }}>
    <FeatureAppContainer
      key="fa-all-promotions"
      featureAppId="fa-all-promotions"
      featureAppDefinition={featureAppDefinition}
      baseUrl=".."
    />
  </ThemeProvider>,
  {
    additionalFeatureServices: [],
    hideIdkLoginLink: true,
  },
  'root',
);
