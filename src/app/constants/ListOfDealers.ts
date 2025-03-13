type ListOfDealersTypes = {
  [key: string]: string[];
};

const listOfDealers: ListOfDealersTypes = {
  MTL: [
    'Audi Anjou',
    'Audi Blainville',
    'Audi Lauzon',
    'Audi Popular',
    'Audi St-Bruno',
    'Audi St. Laurent',
    'Audi West Island',
    'Park Avenue Audi',
  ],
  GTA: [
    'Audi Brampton',
    'Audi Downtown Toronto',
    'Audi Durham',
    'Audi Midtown Toronto',
    'Audi Oakville',
    'Audi Mississauga',
    'Audi Queensway',
    'Audi Thornhill',
    'Audi Uptown',
    'HJ Pfaff Motors',
    'Pfaff Audi',
  ],
  VAN: [
    'Audi Boundary',
    'Audi Downtown Vancouver',
    'Audi Langley',
    'Audi Richmond',
    'Capilano Audi',
  ],
  APA: ['Audi Royal Oak', 'Southgate Audi', 'Audi Edmonton North', 'Glenmore Audi'],
};

export default listOfDealers;
