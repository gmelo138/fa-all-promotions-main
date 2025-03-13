import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@audi/audi-ui-react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FilterBar from '../FilterBar';

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
  confirmedFilters: {
    regionFilter: ['NAT'],
    vehicleTypeFilter: ['USED-CAR'],
    bodyTypeFilter: ['Sedan'],
    modelFamilyFilter: ['A4'],
    modelYearRange: [2018, 2021],
  },
};
const mockStore = configureStore();
const store = mockStore(initialState);

describe('test filter bar panel', () => {
  test('filter bar is rendering', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <FilterBar />
        </ThemeProvider>
      </Provider>,
    );
    expect(await screen.findByTestId('filter-bar')).toBeInTheDocument();
  });
  test('restore default button rendering and working', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <FilterBar />
        </ThemeProvider>
      </Provider>,
    );
    const clearFiltersBtn = await screen.findByTestId('clear-filters-btn');
    expect(clearFiltersBtn).toBeInTheDocument();

    fireEvent.click(clearFiltersBtn);
    const expectedActions = { type: 'ALL_FILTERS_CLEAR' };
    expect(store.getActions() as []).toContainEqual(expectedActions);

    fireEvent.keyDown(clearFiltersBtn, { key: 'Enter', charCode: 13 });
  });
});
