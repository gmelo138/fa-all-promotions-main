import * as React from 'react';
import App from '@oneaudi/fa-doc-renderer';

export default () => (
  <App
    appId={__FEATURE_APP_NAME__}
    documents={[
      {
        title: 'Readme',
        component: React.lazy(() => import('../README.md')),
      },
      {
        title: 'Changelog',
        component: React.lazy(() => import('../CHANGELOG.md')),
      },
    ]}
  />
);
