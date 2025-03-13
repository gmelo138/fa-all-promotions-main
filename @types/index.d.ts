import { DataLayerV2 } from '@oneaudi/audi-tracking-service';

declare const DEBUG: boolean;

declare global {
  namespace NodeJS {
    interface Global {
      __FEATURE_APP_NAME__: string;
      __FEATURE_APP_VERSION__: string;
    }
  }
  interface Window {
    digitalData: DataLayerV2;
  }
}
