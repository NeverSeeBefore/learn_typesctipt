import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './redux/store';
import MovieAction from './redux/actions/MovieAction';

store.subscribe(() => {
  console.log("------state----change-------");
})

// setTimeout(() => {
//   store.dispatch(MovieAction.setIsLoading(true));
// }, 2000)

// store.dispatch(MovieAction.fetchMovies({
//   limit: 9
// }));
// store.dispatch(MovieAction.deleteMovie("5f3d1b88d5a0ba7973c03489"));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);