import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@audi/audi-ui-react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ModelYearRangeFilterTag from '../ModelYearRangeFilterTag';

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
    regionFilter: ['NAT', 'MTL'],
    vehicleTypeFilter: ['USED-CAR', 'NEW-CAR'],
    bodyTypeFilter: ['Sedan'],
    modelFamilyFilter: ['A4'],
    modelYearRange: [2018, 2021],
  },
};
const mockStore = configureStore();
const store = mockStore(initialState);

describe('test Year Range filter tags', () => {
  test('Year Range filter tag rendering ', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <ModelYearRangeFilterTag />
        </ThemeProvider>
      </Provider>,
    );
    expect(await screen.findByTestId('2018,2021')).toBeInTheDocument();
  });
  test('Year Range filter tag is not rendering', () => {
    const stateWithNoYearRange = {
      confirmedFilters: {
        regionFilter: [],
        vehicleTypeFilter: [],
        bodyTypeFilter: ['Sedan'],
        modelFamilyFilter: [],
        modelYearRange: [],
      },
    };
    const noYearRangeStore = mockStore(stateWithNoYearRange);
    render(
      <Provider store={noYearRangeStore}>
        <ThemeProvider>
          <ModelYearRangeFilterTag />
        </ThemeProvider>
      </Provider>,
    );
    expect(screen.queryByTestId('2018,2021')).toBeNull();
  });
  test('Single Year Range filter tag is not rendering', async () => {
    const stateWithSingleYearRange = {
      confirmedFilters: {
        regionFilter: [],
        vehicleTypeFilter: [],
        bodyTypeFilter: ['Sedan'],
        modelFamilyFilter: [],
        modelYearRange: [2018, 2018],
      },
    };
    const singleYearRangeStore = mockStore(stateWithSingleYearRange);
    render(
      <Provider store={singleYearRangeStore}>
        <ThemeProvider>
          <ModelYearRangeFilterTag />
        </ThemeProvider>
      </Provider>,
    );
    expect(await screen.findByText(/singleModelYear/i)).toBeInTheDocument();
  });
  test('clear filter button rendering and working', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <ModelYearRangeFilterTag />
        </ThemeProvider>
      </Provider>,
    );
    const deleteYearRangeButton = await screen.findByTestId('2018');
    expect(deleteYearRangeButton).toBeInTheDocument();

    fireEvent.click(deleteYearRangeButton);
    const expectedActions = {
      type: 'MODEL_YEAR_RANGE_DELETE',
      payload: { filter: [2018, 2021] },
    };
    expect(store.getActions() as []).toContainEqual(expectedActions);

    fireEvent.keyDown(deleteYearRangeButton, { key: 'Enter', charCode: 13 });
  });
});
