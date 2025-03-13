/* eslint-disable @typescript-eslint/no-unsafe-return */
const paramsMap = new Map();
paramsMap.set('Sedan', 'limousine');
paramsMap.set('allroad quattro', 'allroad-quattro');
paramsMap.set('NEW-CAR', 'new');
paramsMap.set('USED-CAR', 'cpo');

const getMappedKeyWords = (key: string | undefined): string => {
  return paramsMap.get(key) || key;
};

export default getMappedKeyWords;
