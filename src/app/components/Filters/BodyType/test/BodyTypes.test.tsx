import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@audi/audi-ui-react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import BodyTypes from '../BodyTypes';
import { mockedPromotions } from '../../../../../test/mocks';

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

const initialState = {
  temporaryFilters: {
    regionFilter: ['NAT'],
    vehicleTypeFilter: ['USED-CAR'],
    bodyTypeFilter: [],
    modelFamilyFilter: ['A4'],
    modelYearRange: [2018, 2021],
  },
  confirmedFilters: {
    regionFilter: ['NAT'],
    vehicleTypeFilter: ['USED-CAR'],
    bodyTypeFilter: [],
    modelFamilyFilter: ['A4'],
    modelYearRange: [2018, 2021],
  },
  queries: {
    promotions: {
      result: mockedPromotions,
    },
  },
};
const mockStore = configureStore();
const store = mockStore(initialState);

describe('test body type filter button', () => {
  test('button is rendering', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <BodyTypes isTypeSelected />
        </ThemeProvider>
      </Provider>,
    );
    expect(await screen.findByTestId('Sedan')).toBeInTheDocument();
  });
});
