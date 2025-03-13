import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@audi/audi-ui-react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RegionList from '../RegionList';

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
    vehicleTypeFilter: ['NEW-CAR'],
    bodyTypeFilter: [],
    modelFamilyFilter: [],
    modelYearRange: [],
  },
};
const mockStore = configureStore();
const store = mockStore(initialState);

describe('test region checkbox', () => {
  test('checkbox is rendering', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <RegionList />
        </ThemeProvider>
      </Provider>,
    );
    expect(await screen.findByTestId('MTL')).toBeInTheDocument();
  });
});
