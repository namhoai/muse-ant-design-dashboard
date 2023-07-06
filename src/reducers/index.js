import { combineReducers } from '@reduxjs/toolkit';

import authenticationReducer from '@modules/authentication/authentication.slice';
// import globalUIReducer from '@modules/globalUI/globalUI.slice';

const reducers = combineReducers({
  authentication: authenticationReducer
  // globalUI: globalUIReducer
});

export default reducers;
