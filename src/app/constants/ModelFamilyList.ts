type List = {
  [key: string]: string[];
};

type Carline = {
  [key: string]: {
    [key: string]: string;
  };
};

type CarlineQueries = {
  [key: string]: {
    carlines: string[];
  };
};

const modelFilterList: List = {
  'A/S': ['A3', 'S3', 'A4', 'S4', 'A5', 'S5', 'A6', 'S6', 'A7', 'S7', 'A8', 'S8'],
  'e-tron': ['etron', 'etrons', 'etrongt', 'rsetrongt', 'Q4', 'Q8etron', 'SQ8etron'],
  'Q/SQ': ['Q3', 'Q4', 'Q5', 'Q5e', 'SQ5', 'Q7', 'SQ7', 'Q8', 'SQ8', 'Q8etron', 'SQ8etron'],
  'R/RS': ['RS3', 'RS5', 'RS6', 'RS7', 'R8', 'RSQ8', 'TTRS'],
  TT: ['TT', 'TTS'],
};

export const CARLINES: Carline = {
  A3: {
    Sedan: 'a3limo',
    Cabriolet: 'a3cabrio',
  },
  A4: {
    Sedan: 'a4limo',
    'allroad quattro': 'a4aq',
  },
  A5: {
    Coupe: 'a5coupe',
    Sportback: 'a5sb',
    Cabriolet: 'a5cabrio',
  },
  A6: {
    Sedan: 'a6limo',
    'allroad quattro': 'a6aq',
  },
  A7: {
    Sportback: 'a7sb',
  },
  A8: {
    Sedan: 'a8l',
  },
  S3: {
    Sedan: 's3limo',
  },
  S4: {
    Sedan: 's4limo',
  },
  S5: {
    Coupe: 's5coupe',
    Sportback: 's5sb',
    Cabriolet: 's5cabrio',
  },
  S6: {
    Sedan: 's6limo',
  },
  S7: {
    Sportback: 's7sb',
  },
  S8: {
    Sedan: 's8l',
  },
  Q3: {
    SUV: 'q3',
  },
  Q4: {
    SUV: 'q4',
    Sportback: 'q4sbetron',
  },
  Q5: {
    SUV: 'q5',
    Sportback: 'q5sb',
  },
  Q5e: {
    SUV: 'q5etron',
  },
  Q7: {
    SUV: 'q7',
  },
  Q8: {
    SUV: 'q8',
  },
  SQ5: {
    SUV: 'sq5',
    Sportback: 'sq5sb',
  },
  SQ7: {
    SUV: 'sq7',
  },
  SQ8: {
    SUV: 'sq8',
  },
  Q8etron: {
    SUV: 'q8etron',
    Sportback: 'q8sbetron',
  },
  SQ8etron: {
    SUV: 'sq8etron',
    Sportback: 'sq8sbetron',
  },
  RS3: {
    Sedan: 'rs3limo',
  },
  RS5: {
    Coupe: 'rs5coupe',
    Sportback: 'rs5sb',
  },
  RS6: {
    Avant: 'rs6avant',
  },
  RS7: {
    Sportback: 'rs7sb',
  },
  RSQ8: {
    SUV: 'rsq8',
  },
  R8: {
    Coupe: 'r8',
    Spyder: 'r8spyder',
  },
  TT: {
    Coupe: 'ttcoupe',
    Roadster: 'ttroadster',
  },
  TTS: {
    Coupe: 'ttscoupe',
  },
  TTRS: {
    Coupe: 'ttrscoupe',
  },
  etrons: {
    SUV: 'etron',
    Sportback: 'etronsb',
  },
  etron: {
    SUV: 'etron',
    Sportback: 'etronsb',
  },
  etrongt: {
    Sedan: 'etrongt',
  },
  rsetrongt: {
    Sedan: 'rsetrongt',
  },
};

export const carlineGroupQuery: CarlineQueries = {
  A3: {
    carlines: ['A3', 'S3', 'RS3'],
  },
  A4: {
    carlines: ['A4', 'S4'],
  },
  A5: {
    carlines: ['A5', 'S5', 'RS5'],
  },
  A6: {
    carlines: ['A6', 'S6', 'RS6'],
  },
  A7: {
    carlines: ['A7', 'S7', 'RS7'],
  },
  A8: {
    carlines: ['A8', 'S8'],
  },
  Q3: {
    carlines: ['Q3'],
  },
  Q5: {
    carlines: ['Q5', 'Q5e', 'SQ5'],
  },
  Q4: {
    carlines: ['Q4'],
  },
  Q7: {
    carlines: ['Q7', 'SQ7'],
  },
  Q8: {
    carlines: ['Q8', 'SQ8', 'RSQ8'],
  },
  Q8etron: {
    carlines: ['Q8etron', 'SQ8etron'],
  },
  etron: {
    carlines: ['etron', 'etrons'],
  },
  etrongt: {
    carlines: ['etrongt', 'rsetrongt'],
  },
  R8: {
    carlines: ['R8'],
  },
  TT: {
    carlines: ['TT', 'TTS', 'TTRS'],
  },
};

export const orderModelFilterList: string[] = [
  'A3 Sedan',
  'A3 Sportback e-tron',
  'A3 Cabriolet',
  'S3 Sedan',
  'RS 3 Sedan',
  'A4 Sedan',
  'A4 allroad quattro',
  'A4 allroad',
  'A4 allroad ',
  'A4 Avant',
  'S4 Sedan',
  'RS 4 Sedan',
  'A5 Coupé',
  'A5 Sportback',
  'A5 Cabriolet',
  'S5 Coupé',
  'S5 Sportback',
  'S5 Cabriolet',
  'RS 5 Coupé',
  'RS 5 Sportback',
  'RS 5 Cabriolet',
  'A6 Sedan',
  'A6 allroad quattro',
  'A6 allroad',
  'A6 allroad ',
  'S6 Sedan',
  'RS 6 Avant',
  'A7 Sportback',
  'A7 Sportback TFSI e',
  'A7 Sportback e',
  'A7 TFSI e',
  'S7 Sportback',
  'RS 7',
  'RS 7 Sportback',
  'A8',
  'A8 Sedan',
  'A8L',
  'A8 L',
  'S8',
  'S8 Sedan',
  'S8 Sedan Plus',
  'e-tron',
  'e-tron Sportback',
  'e-tron S Sportback',
  'e-tron GT',
  'RS e-tron GT',
  'Q3',
  'SQ3',
  'RS Q3',
  'Q4',
  'Q4 e-tron',
  'Q4 e-tron Sportback',
  'Q4 Sportback e-tron',
  'Q5',
  'Q5 Sportback',
  'Q5 TFSI e',
  'Q5 TDI',
  'SQ5',
  'SQ5 Sportback',
  'Q7',
  'SQ7',
  'RS Q7',
  'Q8',
  'Q8 e-tron',
  'Q8 e-tron quattro',
  'Q8 e-tron Sportback',
  'Q8 Sportback e-tron',
  'SQ8',
  'SQ8 e-tron',
  'SQ8 e-tron Sportback',
  'SQ8 Sportback e-tron',
  'RS Q8',
  'TT Coupé',
  'TT Roadster',
  'TT S Coupé',
  'TTS Coupé',
  'TT S Roadster',
  'TT RS Coupé',
  'R8 Coupé',
  'R8 Coupe',
  'R8 Spyder',
];

export default modelFilterList;
