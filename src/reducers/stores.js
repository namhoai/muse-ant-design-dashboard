import { contantAuthentication } from '@constants/index';
import { loadFromLocalStorageObjectFromBase64 } from '@databases/localStorage';
import { configureStore } from '@reduxjs/toolkit';
import reducers from '@reducers/index';

const preloadedState = () => {
  const user = loadFromLocalStorageObjectFromBase64(contantAuthentication.DATA_AUTH);
  return { authentication: { user: user ? user : {} } };
};

const store = configureStore({
  reducer: reducers,
  preloadedState: preloadedState()
});

export default store;
