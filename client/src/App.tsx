import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Layout}></Route>
    </BrowserRouter>
  );
}

export default App;
