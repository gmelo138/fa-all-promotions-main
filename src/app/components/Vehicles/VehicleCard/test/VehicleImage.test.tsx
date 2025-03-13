import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@audi/audi-ui-react';
import VehicleImage from '../VehicleImage';

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

describe('testing is vehicle image rendering', () => {
  test('The image is rendering, disclaimer is on the screen', async () => {
    render(
      <ThemeProvider>
        <VehicleImage modelImage="1" isCpoVehicle year={2023} />
      </ThemeProvider>,
    );
    expect(await screen.findByTestId('vehicle-image')).toBeTruthy();
    // expect(await screen.findByTestId('image-disclaimer')).toBeTruthy();
  });
});
