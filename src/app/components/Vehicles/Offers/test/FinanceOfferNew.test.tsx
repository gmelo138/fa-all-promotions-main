/* eslint-disable react/react-in-jsx-scope */
// import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { AudiPlatformProvider } from '@audi/audi-ui-react';
// import FinanceOffer from './FinanceOfferNew';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () =>
          new Promise(() => {
            null;
          }),
      },
    };
  },
}));

describe('Check if finance tab is rendering correctly', () => {
  test('empty', () => {
    return undefined;
  });
  // TODO FIXME footnote service provider has to be mocked
  /*
  test('finance tab details are shown/hidden accordingly', () => {
    const offer = {
      offertypes: [
        {
          financeDownPayment: 4000,
          financeMinimumPayment: 778.9234367151159,
          financePaymentFrequency: 'MONTHLY',
          name: 'FinanceMinimumPayment',
        },
        {
          financeApr: null,
          financePeriod: 60,
          financeRate: 3.4799999999999995,
          name: 'FinancePercentage',
          __typename: 'PromotionsFinancePercentage',
        },
      ],
      __typename: 'SplitOfferTypes',
      title: 'Finance',
    };
    const listOfTabs = ['Lease', 'Finance'];
    render(
      <AudiPlatformProvider>
        <FinanceOffer offer={offer} lang="en" listOfTabs={listOfTabs} idForQA="40 Komfort + 0" />
      </AudiPlatformProvider>
    );
    expect(screen.queryByTestId('40 Komfort + 0 + finance-rate')).toBeTruthy();
    expect(screen.queryByTestId('40 Komfort + 0 + finance-period')).toBeTruthy();
    expect(screen.queryByTestId('40 Komfort + 0 + finance-down-payment')).toBeTruthy();
    expect(screen.queryByTestId('40 Komfort + 0 + finance-apr')).toBeFalsy();
  });
    */
});
