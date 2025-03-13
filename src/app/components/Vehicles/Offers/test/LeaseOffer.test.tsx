/* eslint-disable react/react-in-jsx-scope */
// import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { AudiPlatformProvider } from '@audi/audi-ui-react';
// import Lease from './LeaseOffer';

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

describe('check if lease tab is rendering correctly', () => {
  test('empty', () => {
    return undefined;
  });
  // TODO FIXME footnote service provider has to be mocked
  /*
  test('lease tab details are shown/hidden accordingly', () => {
    const offer = {
      offertypes: [
        {
          leaseDownPayment: 4000,
          leaseMinimumPayment: 476.81824166666667,
          leasePaymentFrequency: 'MONTHLY',
          name: 'LeaseMinimumPayment',
          __typename: 'PromotionsLeaseMinimumPayment',
        },
        {
          leaseApr: null,
          leasePeriod: 48,
          leaseRate: 3.9800000000000004,
          name: 'LeasePercentage',
          __typename: 'PromotionsLeasePercentage',
        },
      ],
      title: 'Lease',
      __typename: 'SplitOfferTypes',
    };
    const listOfTabs = ['Lease', 'Finance'];
    render(
      <AudiPlatformProvider>
        <Lease offer={offer} lang="en" listOfTabs={listOfTabs} idForQA="40 Komfort + 0" />
      </AudiPlatformProvider>
    );
    expect(screen.queryByTestId('40 Komfort + 0 + lease-rate')).toBeTruthy();
    expect(screen.queryByTestId('40 Komfort + 0 + lease-period')).toBeTruthy();
    expect(screen.queryByTestId('40 Komfort + 0 + lease-down-payment')).toBeTruthy();
    expect(screen.queryByTestId('40 Komfort + 0 + lease-apr')).toBeFalsy();
  });
  */
});
