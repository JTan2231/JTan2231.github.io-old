import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './pages/main.jsx';

//document.body.style.height = '100vh';
//document.body.style.margin = '0';
//document.getElementById('root').style.height = '100%';
const root = ReactDOM.createRoot(document.getElementById('root'));

console.log(root);


root.render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
