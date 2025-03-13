import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@audi/audi-ui-react';
import LegalModal from './LegalModal';
import * as checkIsThisChinesePage from '../../../functions/checkIsThisChinesePage';

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

const chinesePageFunctionSpy = jest.spyOn(
  checkIsThisChinesePage,
  'checkIsThisChinesePage' as never,
);

describe('test functionality of legal modal', () => {
  test('modal is closing in 3 different scenarions', async () => {
    const handleCloseModal = jest.fn();
    const { container } = render(
      <ThemeProvider>
        <LegalModal
          legalText="legal_en"
          isLegalModalOpen
          setIsLegalModalOpen={handleCloseModal}
          idForQA="1"
        />
      </ThemeProvider>,
    );

    const legalModal = await screen.findByTestId('legal-modal');
    const closeBtn = await screen.findByTestId('legal-modal-close-btn');
    const blackLayer = await screen.findByTestId('legal-modal-black-layer');

    expect(legalModal).toBeTruthy();
    fireEvent.click(closeBtn);
    fireEvent.click(blackLayer);
    fireEvent.keyDown(container, { key: 'Escape', charCode: 27 });
    expect(handleCloseModal).toHaveBeenCalledTimes(3);
  });
});

describe('legal language is rendering correctly', () => {
  test('modal has french legal copy', () => {
    const handleCloseModal = jest.fn();
    render(
      <ThemeProvider>
        <LegalModal
          legalText="legal_fr"
          isLegalModalOpen
          setIsLegalModalOpen={handleCloseModal}
          idForQA="1"
        />
      </ThemeProvider>,
    );
    expect(screen.queryByText(/legal_fr/i)).toBeInTheDocument();
  });

  test('modal has chinese legal copy', async () => {
    const handleCloseModal = jest.fn();
    chinesePageFunctionSpy.mockImplementation(() => true as never);
    render(
      <ThemeProvider>
        <LegalModal
          legalText="legal_cn"
          isLegalModalOpen
          setIsLegalModalOpen={handleCloseModal}
          idForQA="1"
        />
      </ThemeProvider>,
    );
    expect(await screen.findByText(/legal_cn/i)).toBeInTheDocument();
  });
});
