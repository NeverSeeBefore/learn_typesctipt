import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={Layout}></Route>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
