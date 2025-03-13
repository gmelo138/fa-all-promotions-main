const getCorrectFrequency = (freq: string | undefined): string | undefined | null => {
  if (!freq) {
    return null;
  }
  return freq
    .replace(/-/g, '')
    .toLocaleLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default getCorrectFrequency;
