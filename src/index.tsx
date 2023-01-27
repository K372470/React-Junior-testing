import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import rootStore from './redux-slices/RootStore';
import { App } from './App';

ReactDOM.render(
  <BrowserRouter>
    <ChakraProvider>
      <Provider store={rootStore}>
        <App />
      </Provider>
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
