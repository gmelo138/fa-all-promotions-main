import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@audi/audi-ui-react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ModelFamilyFilterTag from '../ModelFamilyFilterTag';

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

describe('test model family filter tags', () => {
  test('Model family filter tag rendering ', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <ModelFamilyFilterTag />
        </ThemeProvider>
      </Provider>,
    );
    expect(await screen.findByTestId('A4')).toBeInTheDocument();
  });
  test('Model family filter tag is not rendering', () => {
    const stateWithNoModelFamily = {
      confirmedFilters: {
        regionFilter: ['NAT'],
        vehicleTypeFilter: ['USED-CAR'],
        bodyTypeFilter: ['Sedan'],
        modelFamilyFilter: [],
        modelYearRange: [2018, 2021],
      },
    };
    const noModelStore = mockStore(stateWithNoModelFamily);
    render(
      <Provider store={noModelStore}>
        <ThemeProvider>
          <ModelFamilyFilterTag />
        </ThemeProvider>
      </Provider>,
    );
    expect(screen.queryByTestId('A4')).toBeNull();
  });
  test('clear filter button rendering and working', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <ModelFamilyFilterTag />
        </ThemeProvider>
      </Provider>,
    );
    const deleteModelFamilyButton = await screen.findByTestId('A4+tag');
    expect(deleteModelFamilyButton).toBeInTheDocument();

    fireEvent.click(deleteModelFamilyButton);
    const expectedActions = { type: 'MODEL_FAMILY_DELETE', payload: { modelFamily: 'A4' } };
    expect(store.getActions() as []).toContainEqual(expectedActions);

    fireEvent.keyDown(deleteModelFamilyButton, { key: 'Enter', charCode: 13 });
  });
});
