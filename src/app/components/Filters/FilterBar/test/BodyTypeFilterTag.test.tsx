import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@audi/audi-ui-react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import BodyTypeFilterTag from '../BodyTypeFilterTag';

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

describe('test body type filter tags', () => {
  test('body type filter tag is rendering', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <BodyTypeFilterTag />
        </ThemeProvider>
      </Provider>,
    );
    expect(await screen.findByTestId('Sedan')).toBeInTheDocument();
  });
  test('Body filter tag is not rendering', () => {
    const stateWithNoBody = {
      confirmedFilters: {
        regionFilter: ['NAT'],
        vehicleTypeFilter: ['USED-CAR'],
        bodyTypeFilter: [],
        modelFamilyFilter: ['A4'],
        modelYearRange: [2018, 2021],
      },
    };
    const noBodyStore = mockStore(stateWithNoBody);
    render(
      <Provider store={noBodyStore}>
        <ThemeProvider>
          <BodyTypeFilterTag />
        </ThemeProvider>
      </Provider>,
    );
    expect(screen.queryByTestId('Sedan')).toBeNull();
  });
  test('clear filter button rendering and working', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <BodyTypeFilterTag />
        </ThemeProvider>
      </Provider>,
    );
    const deleteBodyTypeFilter = await screen.findByTestId('Sedan+tag');
    expect(deleteBodyTypeFilter).toBeInTheDocument();

    fireEvent.click(deleteBodyTypeFilter);
    const expectedActions = { type: 'BODY_TYPE_DELETE', payload: { bodyType: 'Sedan' } };
    expect(store.getActions() as []).toContainEqual(expectedActions);

    fireEvent.keyDown(deleteBodyTypeFilter, { key: 'Enter', charCode: 13 });
  });
});
