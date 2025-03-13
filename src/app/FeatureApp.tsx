/**
 * This is the starting point of your application.
 * Feature Hub Apps will use this file to bootstrap the app.
 */
import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { AudiPlatformProvider } from '@audi/audi-ui-react';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import { Provider as StoreProvider } from 'react-redux';
import { GfaServiceConfigProviderV1 } from '@volkswagen-onehub/gfa-service-config-provider';
import { GRAPHQL_GATEWAY_URL } from './constants/environment';
import i18n from '../i18n';
import prepareStore from './redux/prepareStore';
import GlobalStyles from './styles';
import { COLORS } from './styles/variables';
import Promotions from './components';
import ErrorBoundary from './components/ErrorBoundary';

const apolloClient = new ApolloClient({
  uri: GRAPHQL_GATEWAY_URL,
  cache: new InMemoryCache({
    typePolicies: {
      SplitPromotionOffer: {
        keyFields: [
          'trimName',
          'dag',
          'year',
          'msrp',
          'modelSalesCode',
          'bodyStyleEn',
          'featuredHierarchy',
          'image',
        ],
      },
    },
  }),
});

const store = prepareStore();
interface FeatureAppProps {
  configProvider: GfaServiceConfigProviderV1;
}

const FeatureApp: React.FC<FeatureAppProps> = ({ configProvider }: FeatureAppProps) => {
  return (
    <AudiPlatformProvider>
      <I18nextProvider i18n={i18n}>
        {/* @ts-ignore:next-line */}
        <ErrorBoundary>
          <ThemeProvider theme={COLORS}>
            <ApolloProvider client={apolloClient}>
              <StoreProvider store={store}>
                <div className="resetWrapper" role="main">
                  <Promotions />
                </div>
              </StoreProvider>
            </ApolloProvider>
            <GlobalStyles />
          </ThemeProvider>
        </ErrorBoundary>
      </I18nextProvider>
    </AudiPlatformProvider>
  );
};

export default FeatureApp;
