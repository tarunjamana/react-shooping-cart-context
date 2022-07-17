import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Context from './context/Context';
import {configureStore} from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import cartReducer from './features/product';
import filterReducer from './features/filters';

const store = configureStore({
  reducer:{
    cart:cartReducer,
    filters:filterReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context>
    <Provider store={store}>
    <App />
    </Provider>
    </Context>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
