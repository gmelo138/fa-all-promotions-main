/**
 * This is the entry point for Feature Hub App integration
 */

import React from 'react';
import { FeatureAppDefinition, FeatureAppEnvironment, FeatureServices } from '@feature-hub/core';
import { ReactFeatureApp } from '@feature-hub/react';
import type { Logger } from '@feature-hub/logger';
import type { GfaLocaleServiceV1 } from '@volkswagen-onehub/gfa-locale-service';
import { TrackingServiceV2 } from '@volkswagen-onehub/audi-tracking-service';
import { GfaServiceConfigProviderV1 } from '@volkswagen-onehub/gfa-service-config-provider';
// What's the difference between ContentService and ContentServiceV1
import { ContentService } from '@volkswagen-onehub/audi-content-service';
import { EnvConfigServiceV1 } from '@volkswagen-onehub/audi-env-config-service';
import App from './FeatureApp';

export interface FeatureServiceDependencies extends FeatureServices {
  readonly 's2:logger'?: Logger;
  readonly 'gfa:service-config-provider': GfaServiceConfigProviderV1;
  readonly 'gfa:locale-service': GfaLocaleServiceV1;
  readonly 'audi-tracking-service': TrackingServiceV2;
  readonly 'audi-content-service': ContentService;
  readonly 'audi:envConfigService': EnvConfigServiceV1;
}

const featureAppDefinition: FeatureAppDefinition<ReactFeatureApp, FeatureServiceDependencies> = {
  dependencies: {
    featureServices: {
      's2:logger': '^1.0.0',
      'gfa:locale-service': '^1.0.0',
      'gfa:service-config-provider': '^1.0.0',
      'audi-tracking-service': '^2.1.0',
      'audi-content-service': '^1.0.0',
      'audi:envConfigService': '^1.0.0',
    },
    externals: {
      // react: '>= 16 < 18',
      react: '*',
      'styled-components': '*',
      '@feature-hub/react': '^2.7.0',
      'react-dom': '>= 16 < 18',
    },
  },
  optionalDependencies: {
    featureServices: {
      'audi-tracking-service': '^2.1.0',
    },
  },

  create: ({ featureServices }: FeatureAppEnvironment<FeatureServiceDependencies, void>) => {
    const loggerService = featureServices['s2:logger'];
    loggerService?.info('Feature App created.');

    const configProvider = featureServices[
      'gfa:service-config-provider'
    ] as GfaServiceConfigProviderV1;

    return {
      render: () => {
        return <App configProvider={configProvider} />;
      },
    };
  },
};

export default featureAppDefinition;
