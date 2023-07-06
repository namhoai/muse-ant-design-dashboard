import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import * as serviceWorker from './serviceWorker';
import App from "./App";

import store from '@reducers/stores';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);


// If you want to enable client cache, register instead.
serviceWorker.unregister();
