const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const numberFormatter = (
  number: number | null | undefined,
  language: string,
): string | null | undefined => {
  if (number === null || number === undefined) {
    return null;
  }
  if (language === 'fr') {
    return `${new Intl.NumberFormat().format(Math.round(number)).replace(',', ' ')} $`;
  }
  return formatter.format(number);
};

export default numberFormatter;
