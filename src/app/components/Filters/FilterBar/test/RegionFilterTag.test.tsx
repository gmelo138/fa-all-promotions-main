import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@audi/audi-ui-react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RegionFilterTag from '../RegionFilterTag';

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
    vehicleTypeFilter: ['USED-CAR'],
    bodyTypeFilter: ['Sedan'],
    modelFamilyFilter: ['A4'],
    modelYearRange: [2018, 2021],
  },
};
const mockStore = configureStore();
const store = mockStore(initialState);

describe('test region filter tags', () => {
  test('Region filter tag rendering ', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <RegionFilterTag />
        </ThemeProvider>
      </Provider>,
    );
    expect(await screen.findByTestId('MTL')).toBeInTheDocument();
  });
  test('Region filter tag is not rendering', () => {
    const stateWithNoRegion = {
      confirmedFilters: {
        regionFilter: [],
        vehicleTypeFilter: ['USED-CAR'],
        bodyTypeFilter: ['Sedan'],
        modelFamilyFilter: [],
        modelYearRange: [2018, 2021],
      },
    };
    const noRegionStore = mockStore(stateWithNoRegion);
    render(
      <Provider store={noRegionStore}>
        <ThemeProvider>
          <RegionFilterTag />
        </ThemeProvider>
      </Provider>,
    );
    expect(screen.queryByTestId('NAT')).toBeNull();
  });
  test('clear filter button rendering and working', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <RegionFilterTag />
        </ThemeProvider>
      </Provider>,
    );
    const deleteRegionButton = await screen.findByTestId('MTL+tag');
    expect(deleteRegionButton).toBeInTheDocument();

    fireEvent.click(deleteRegionButton);
    const expectedActions = { type: 'REGION_FILTER_DELETE', payload: { region: 'MTL' } };
    expect(store.getActions() as []).toContainEqual(expectedActions);

    fireEvent.keyDown(deleteRegionButton, { key: 'Enter', charCode: 13 });
  });
});
