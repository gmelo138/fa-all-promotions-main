// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { AudiPlatformProvider } from '@audi/audi-ui-react';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import VehicleType from '../VehicleType';

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

describe('test region checkbox', () => {
  test('empty', () => undefined);
  // const initialState = {
  //   temporaryFilters: {
  //     regionFilter: ['NAT'],
  //     vehicleTypeFilter: ['NEW-CAR'],
  //     bodyTypeFilter: [],
  //     modelFamilyFilter: [],
  //     modelYearRange: [],
  //   },
  // };
  // const mockStore = configureStore();
  // const store = mockStore(initialState);
  // test('checkbox is rendering', async () => {
  //   render(
  //     <Provider store={store}>
  //       <AudiPlatformProvider>
  //         <VehicleType vehicleType="NEW-CAR" />
  //       </AudiPlatformProvider>
  //     </Provider>
  //   );
  //   expect(await screen.findByTestId('NEW-CAR')).toBeInTheDocument();
  //   const checkbox = screen.getByLabelText('filter.components.listOfAllFilters.NEW-CAR');
  //   expect(checkbox).toBeChecked();
  //   fireEvent.click(checkbox);
  //   const expectedActions = { type: 'VEHICLE_TYPE_FILTER_SET', payload: { filter: 'NEW-CAR' } };
  //   expect(store.getActions() as []).toContainEqual(expectedActions);
  // });
  // test('dispatch for vehicle type is working', () => {
  //   render(
  //     <Provider store={store}>
  //       <AudiPlatformProvider>
  //         <VehicleType vehicleType="NEW-CAR" />
  //       </AudiPlatformProvider>
  //     </Provider>
  //   );
  //   const checkbox = screen.getByLabelText('filter.components.listOfAllFilters.NEW-CAR');
  //   expect(checkbox).toBeChecked();
  //   fireEvent.click(checkbox);
  //   const expectedActions = { type: 'VEHICLE_TYPE_FILTER_SET', payload: { filter: 'NEW-CAR' } };
  //   expect(store.getActions() as []).toContainEqual(expectedActions);
  // });
});
