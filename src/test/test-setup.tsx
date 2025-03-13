import '@testing-library/jest-dom';
import { TextEncoder } from 'util';

process.env.__FEATURE_APP_NAME__ = 'fa-all-promotions';
process.env.__FEATURE_APP_VERSION__ = '0.1.0';

global.TextEncoder = TextEncoder;
