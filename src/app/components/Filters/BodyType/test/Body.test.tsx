import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@audi/audi-ui-react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Body from '../Body';
import SedanDefaultIcon from '../../../../assets/icons/FilterBodyTypeOptions/SedanDefaultIcon';
import SedanSelectedIcon from '../../../../assets/icons/FilterBodyTypeOptions/SedanSelectedIcon';

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

describe('test body type filter button', () => {
  test('button is rendering', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Body
            body="Sedan"
            isAvailable={false}
            defaultImage={SedanDefaultIcon}
            selectedImage={SedanSelectedIcon}
          />
        </ThemeProvider>
      </Provider>,
    );
    expect(await screen.findByTestId('Sedan')).toBeInTheDocument();
  });
  test('dispatch for body type is working', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Body
            body="Sedan"
            isAvailable
            defaultImage={SedanDefaultIcon}
            selectedImage={SedanSelectedIcon}
          />
        </ThemeProvider>
      </Provider>,
    );
    const bodyTypeButton = await screen.findByTestId('Sedan');
    fireEvent.click(bodyTypeButton);
    const expectedActions = { type: 'BODY_TYPE_SET', payload: { filter: 'Sedan' } };
    expect(store.getActions() as []).toContainEqual(expectedActions);
  });
});
