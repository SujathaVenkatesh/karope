import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";

import './index.css'
import App from './App.jsx'
import store from './Redux/Store/store.js';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(

 <StrictMode>
    <ToastContainer
      style={{
        zIndex: 1000,
      }}
      position="top-right"
      autoClose={1000}
    />
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
