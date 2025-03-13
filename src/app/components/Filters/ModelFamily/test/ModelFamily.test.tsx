import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@audi/audi-ui-react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ModelFamily from '../ModelFamily';

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
    modelFamilyFilter: ['A4'],
    modelYearRange: [],
  },
};
const mockStore = configureStore();
const store = mockStore(initialState);

describe('test model family filter button', () => {
  test('button is rendering', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <ModelFamily model="A4" isAvailable={false} />
        </ThemeProvider>
      </Provider>,
    );
    expect(await screen.findByTestId('A4')).toBeInTheDocument();
  });
  test('dispatch for model family is working', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <ModelFamily model="A4" isAvailable />
        </ThemeProvider>
      </Provider>,
    );
    const modelFamilyButton = await screen.findByTestId('A4');
    fireEvent.click(modelFamilyButton);
    const expectedActions = { type: 'MODEL_FAMILY_SET', payload: { filter: 'A4' } };

    const isActive = initialState.temporaryFilters.modelFamilyFilter.includes('A4');
    const isAvailable = false;
    if (isActive && !isAvailable) {
      expect(store.getActions() as []).toContainEqual(expectedActions);
    }
  });
});
