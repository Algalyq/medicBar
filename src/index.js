import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from './redux/store';
import { theme } from './styles/theme';
import App from './App';
import './styles/global.css';
import './styles/content.css';
import './styles/testimonials.css'
import './styles/medicalservice.css';
import './styles/price.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);