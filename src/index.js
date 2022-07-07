import React from 'react';
import ReactDOM from 'react-dom/client';

//redux
import { Provider } from 'react-redux';
import store from './store';

//react-router
import {BrowserRouter } from "react-router-dom";

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

