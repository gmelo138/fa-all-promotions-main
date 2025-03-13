import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@audi/audi-ui-react';
import DealerOffer from '../DealerOffer';

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

describe('testing dealer offer correct render', () => {
  test('Dealer offer appears if not NAT offer', () => {
    render(
      <ThemeProvider>
        <DealerOffer dag="NAT" isCarUsed={false} />
      </ThemeProvider>,
    );
    expect(screen.queryByTestId('dealer-offer')).toBeNull();
  });

  test('Dealer offer not appears if NAT offer', async () => {
    render(
      <ThemeProvider>
        <DealerOffer dag="GTA" isCarUsed={false} />
      </ThemeProvider>,
    );
    expect(await screen.findByTestId('dealer-offer')).toBeTruthy();
  });
});
