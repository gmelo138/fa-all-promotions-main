const rateTransform = (rate: number, lang: string) => {
  if (lang === 'fr') return rate.toFixed(2).replace('.', ',');
  return rate.toFixed(2);
};

export default rateTransform;
