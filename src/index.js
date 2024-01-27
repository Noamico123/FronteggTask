import React from 'react';
import ReactDOM from 'react-dom'; // For react 17
// For react 18: import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
  baseUrl: 'https://app-332dy5hns21d.frontegg.com',
  clientId: '12bcffe2-ca44-45b6-b12f-0e8f25039ac5'
};

const authOptions = {
 // keepSessionAlive: true // Uncomment this in order to maintain the session alive
};


// For react 18: 
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
ReactDOM.render(
    <FronteggProvider contextOptions={contextOptions} 
    hostedLoginBox={true}
    authOptions={authOptions}>
        <App />
    </FronteggProvider>,
    document.getElementById('root')
);
