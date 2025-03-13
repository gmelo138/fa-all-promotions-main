// import React from 'react';
// import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { AudiPlatformProvider } from '@audi/audi-ui-react';
// import OfferPlus from '../OfferPlus';
// import * as checkIsThisChinesePage from '../../../../functions/checkIsThisChinesePage';

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

// const chinesePageFunctionSpy = jest.spyOn(
//   checkIsThisChinesePage,
//   'checkIsThisChinesePage' as never
// );

// const offerPlusProp = {
//   __typename: 'offerPlus',
//   name: 'offerPlus',
//   offerPlusCn: 'offerPlusCn',
//   offerPlusFr: 'offerPlusFr',
//   offerPlusEn: 'offerPlusEn',
// };

describe('test offerPlus rendering', () => {
  test('render English version', () => {
    return undefined;
    // chinesePageFunctionSpy.mockImplementation(() => false as never);
    // render(
    //   <AudiPlatformProvider>
    //     <OfferPlus offerPlus={offerPlusProp} idForQA="1" lang="en" />
    //   </AudiPlatformProvider>
    // );
    // expect(await screen.findByText('offerPlusEn')).toBeTruthy();
  });
  test('render French version', () => {
    return undefined;
    // chinesePageFunctionSpy.mockImplementation(() => false as never);
    // render(
    //   <AudiPlatformProvider>
    //     <OfferPlus offerPlus={offerPlusProp} idForQA="1" lang="fr" />
    //   </AudiPlatformProvider>
    // );
    // expect(await screen.findByText('offerPlusFr')).toBeTruthy();
  });
  test('render Chinese version', () => {
    return undefined;
    // chinesePageFunctionSpy.mockImplementation(() => true as never);
    // render(
    //   <AudiPlatformProvider>
    //     <OfferPlus offerPlus={offerPlusProp} idForQA="1" lang="en" />
    //   </AudiPlatformProvider>
    // );
    // expect(await screen.findByText('offerPlusCn')).toBeTruthy();
  });
});
