import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MovieService } from './serveice/MovieService';
import { store } from './redux/store';
import MovieAction from './redux/actions/MovieAction';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// MovieService.addMovie({
//   name: 'abc',
//   timeLong: 0,
//   types: ["喜剧"],
//   areas: ["大陆"],
//   isHot: true,
//   isClassic: false,
//   isComing: false,
// }).then(res => {
//   if(res.err) {
//     console.log('发生错误', res);
//     return;
//   }
//   console.log('成功', res);
//  }, err => console.log('err', err));


// MovieService.editMovie('6008f2fc593890c1afe13925',
//   {
//     name: '一个勺子',
//     timeLong: 111,
//     types: ["喜剧"],
//     areas: ["大陆"],
//     isHot: false,
//     isClassic: true,
//     isComing: false,
//   }
// ).then(res => {
//   if (res.err) {
//     console.log('发生错误', res);
//     return;
//   }
//   const movie = res.data;
//   console.log('成功', res);
//   console.log('movie', movie);
// }, err => console.log('err', err));

// MovieService.deleteMovie('6008f2fc593890c1afe13925').then(res => {
//   if (res.err) {
//     console.log('发生错误', res);
//     return;
//   }
//   console.log('成功', res);
// }, err => console.log('err', err));

// MovieService.getMovie('6008f2fc593890c1afe13925').then(res => {
//   if (res.err) {
//     console.log('发生错误', res);
//     return;
//   }
//   const movie = res.data;
//   console.log('成功', res);
//   console.log('movie', movie);
// }, err => console.log('err', err));



// MovieService.getMovies({ limit: 5, page: 2, key: '电影名称' }).then(res => {
//   if (res.err) {
//     console.log('发生错误', res);
//     return;
//   }
//   const movies = res.data;
//   console.log('成功', res);
//   console.log('movies', movies);
// }, err => console.log('err', err));


// store.subscribe(() => {
//   console.log('监听器', store.getState());
// })

// store.dispatch(MovieAction.createSetIsLoadingAction(true));
// store.dispatch(MovieAction.createSetIsLoadingAction(false));
// store.dispatch(MovieAction.createSetConditionAction({
//   page: 2
// }));

store.dispatch(
  MovieAction.fetchMovies({
    page: 2
  }) as any
).then(() => {
  store.dispatch(
    MovieAction.deleteMovie('6006f457958a352b73a7ce1d')
  );
})