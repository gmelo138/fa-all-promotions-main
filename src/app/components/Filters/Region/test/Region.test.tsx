// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { AudiPlatformProvider } from '@audi/audi-ui-react';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import Region from '../Region';

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
  //     vehicleTypeFilter: [],
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
  //         <Region region="NAT" />
  //       </AudiPlatformProvider>
  //     </Provider>
  //   );
  //   expect(await screen.findByTestId('NAT')).toBeInTheDocument();
  // });
  // test('dispatch is working', () => {
  //   const region = 'NAT';
  //   render(
  //     <Provider store={store}>
  //       <AudiPlatformProvider>
  //         <Region region={region} />
  //       </AudiPlatformProvider>
  //     </Provider>
  //   );
  //   const checkbox = screen.getByLabelText('filter.components.listOfAllFilters.NAT');
  //   expect(checkbox).toBeChecked();
  //   fireEvent.click(checkbox);
  //   const expectedActions = { type: 'REGION_FILTER_SET', payload: { filter: region } };
  //   expect(store.getActions() as []).toContainEqual(expectedActions);
  //   store.clearActions();
  // });
});
