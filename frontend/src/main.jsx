import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { store } from './State/store.js';
import { Provider } from 'react-redux';
import LoadingProvider from './components/Loading.jsx';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <LoadingProvider>
      <Router>
        <React.StrictMode>      
          <App />      
        </React.StrictMode>,
      </Router>
    </LoadingProvider>
  </Provider>,
)
