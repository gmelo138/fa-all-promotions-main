import { legacy_createStore as createStore, Store } from 'redux';
import rootReducer from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: (props: { name: string }) => any;
  }
}

const prepareStore = (): Store => {
  const store = createStore(
    rootReducer,
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      process.env.NODE_ENV !== 'production' &&
      // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION__({
        name: 'Promotions',
      }),
  );

  return store;
};

export default prepareStore;
