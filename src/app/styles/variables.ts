type ColorKeys = keyof typeof COLORS;

export const COLORS = {
  alabaster: '#f8f8f8',
  atomic: '#434c53',
  black: '#000000',
  blue: '#2526fe',
  chromeYellow: '#FFAA00',
  grey5: '#f2f2f2',
  grey10: '#e5e5e5',
  grey15: '#d9d9d9',
  grey20: '#cccccc',
  grey30: '#b3b3b3',
  grey40: '#999999',
  grey50: '#808080',
  grey60: '#666666',
  grey70: '#4c4c4c',
  grey90: '#1a1a1a',
  highlightColor: '#f5f5f5',
  mineShaft: '#333333',
  pinkSwan: '#b7b7b7',
  skeletonColor: '#d9d9d9',
  red: '#FD2C4E',
  white: '#ffffff',
  whisper: '#e9e9e9',
};

export type Color = (typeof COLORS)[ColorKeys];

export const SIZING = {
  unit: (times: number): string => `${times * 8}px`,
};
