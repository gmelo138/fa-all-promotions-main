/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
/* eslint-disable no-shadow */

/**
 * TODO the keys of all of these enums serve as
 * the possible values for query params this feature app
 * expects.
 */

export const MODEL_FAMILY_FILTER_LIST = {
  A3: 'A3',
  A4: 'A4',
  A5: 'A5',
  A6: 'A6',
  A7: 'A7',
  A8: 'A8',
  Q3: 'Q3',
  Q4: 'Q4',
  Q5: 'Q5',
  Q7: 'Q7',
  Q8: 'Q8',
  Q8etron: 'Q8etron',
  R8: 'R8',
  Tt: 'TT',
  Etron: 'etron',
  Etrongt: 'etrongt',
};

export const CARLINE_FILTER_LIST = {
  A3: 'A3',
  A4: 'A4',
  A5: 'A5',
  A6: 'A6',
  A7: 'A7',
  A8: 'A8',
  S3: 'S3',
  S4: 'S4',
  S5: 'S5',
  S6: 'S6',
  S7: 'S7',
  S8: 'S8',
  Q3: 'Q3',
  Q4: 'Q4',
  Q5: 'Q5',
  Q5e: 'Q5e',
  Q7: 'Q7',
  Q8: 'Q8',
  Sq5: 'SQ5',
  Sq7: 'SQ7',
  Sq8: 'SQ8',
  Q8etron: 'Q8etron',
  Rs3: 'RS3',
  Rs5: 'RS5',
  Rs6: 'RS6',
  Rs7: 'RS7',
  Rsq8: 'RSQ8',
  R8: 'R8',
  Tt: 'TT',
  Tts: 'TTS',
  Ttrs: 'TTRS',
  Etron: 'etron',
  Etrons: 'etrons',
  Etrongt: 'etrongt',
  Rsetrongt: 'rsetrongt',
};

// TODO FIXME use ALLROAD_QUATTRO for allroad quattro body type,
// and check out why we have a duplicate line for it
// eslint-disable-next-line
export enum BODY_TYPE_FILTER_LIST {
  'Allroad-quattro' = 'allroad quattro',
  'Allroad quattro' = 'allroad quattro',
  Avant = 'Avant',
  Cabriolet = 'Cabriolet',
  Coupe = 'Coupe',
  Coupé = 'Coupe',
  Roadster = 'Roadster',
  Limousine = 'Sedan',
  Sedan = 'Sedan',
  Sportback = 'Sportback',
  Spyder = 'Spyder',
  Suv = 'SUV',
}

export const REGION_FILTER_LIST = {
  Montreal: 'MTL',
  National: 'NAT',
  Toronto: 'GTA',
  Vancouver: 'VAN',
  Alberta: 'APA',
};

// TODO FIXME use proper naming: NEW and CPO
export const INVENTORY_TYPE_FILTER_LIST = {
  New: 'NEW-CAR',
  Cpo: 'USED-CAR',
};

export const FILTER_LIST = {
  ...MODEL_FAMILY_FILTER_LIST,
  ...BODY_TYPE_FILTER_LIST,
  ...REGION_FILTER_LIST,
  ...INVENTORY_TYPE_FILTER_LIST,
};
