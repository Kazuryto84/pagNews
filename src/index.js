import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import App from "./App";
import { UserProvider } from "./contexts/app.context";
import mockServer from "./utils/mock-servers/axios-mock/mock-server";
import { PersistGate } from 'redux-persist/integration/react';
import './utils/i18n';

import "./index.scss";

const rootElement = document.getElementById("root");

render(
    <BrowserRouter>
      <UserProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </UserProvider>
    </BrowserRouter>,
  rootElement
);
