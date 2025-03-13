import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@audi/audi-ui-react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import VehicleTypeFilterTag from '../VehicleTypeFilterTag';

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

describe('test Inventory Type filter tags', () => {
  test('Inventory Type filter tag rendering ', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <VehicleTypeFilterTag />
        </ThemeProvider>
      </Provider>,
    );
    expect(await screen.findByTestId('USED-CAR')).toBeInTheDocument();
  });
  test('Inventory Type filter tag is not rendering', () => {
    const stateWithNoVehicleType = {
      confirmedFilters: {
        regionFilter: [],
        vehicleTypeFilter: [],
        bodyTypeFilter: ['Sedan'],
        modelFamilyFilter: [],
        modelYearRange: [2018, 2021],
      },
    };
    const noVehicleTypeStore = mockStore(stateWithNoVehicleType);
    render(
      <Provider store={noVehicleTypeStore}>
        <ThemeProvider>
          <VehicleTypeFilterTag />
        </ThemeProvider>
      </Provider>,
    );
    expect(screen.queryByTestId('USED-CAR')).toBeNull();
  });
  test('clear filter button rendering and working', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <VehicleTypeFilterTag />
        </ThemeProvider>
      </Provider>,
    );
    const deleteVehicleTypeButton = await screen.findByTestId('USED-CAR+tag');
    expect(deleteVehicleTypeButton).toBeInTheDocument();

    fireEvent.click(deleteVehicleTypeButton);
    const expectedActions = {
      type: 'VEHICLE_TYPE_FILTER_DELETE',
      payload: { vehicleType: 'USED-CAR' },
    };
    expect(store.getActions() as []).toContainEqual(expectedActions);

    fireEvent.keyDown(deleteVehicleTypeButton, { key: 'Enter', charCode: 13 });
  });
});
