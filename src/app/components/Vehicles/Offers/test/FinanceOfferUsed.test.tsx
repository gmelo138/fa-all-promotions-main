/* eslint-disable react/react-in-jsx-scope */
// import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { AudiPlatformProvider } from '@audi/audi-ui-react';
// import FinanceOfferUsed from './FinanceOfferUsed';

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

describe('Check if CPO reates rendering correctly', () => {
  test('empty', () => {
    return undefined;
  });
  // TODO FIXME footnote service provider has to be mocked
  /*
  test('Rates are on the screen', async () => {
    render(
      <AudiPlatformProvider>
        <FinanceOfferUsed
          offer={null}
          idForQA="1"
          cpoRates={{
            apr0_24: 0.009,
            apr25_36: 0.0348,
            apr37_48: 0.0348,
            apr49_60: 0.0348,
            apr61_72: 0.0398,
          }}
        />
      </AudiPlatformProvider>
    );
    expect(await screen.findByTestId('cpo-finance-rates')).toBeTruthy();
  });
  test('Rate is missing - it will not render', () => {
    render(
      <AudiPlatformProvider>
        <FinanceOfferUsed
          offer={null}
          idForQA="1"
          cpoRates={{
            apr0_24: null,
            apr25_36: 0.0348,
            apr37_48: 0.0348,
            apr49_60: 0.0348,
            apr61_72: 0.0398,
          }}
        />
      </AudiPlatformProvider>
    );
    expect(screen.queryByTestId('cpo-rate-term+apr0_24')).toBeNull();
  });
  */
});
