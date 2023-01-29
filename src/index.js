import React from 'react';
import ReactDOM from 'react-dom';
import { Portfolio } from './pages/portfolio.jsx';
import { Playground } from './pages/playground.jsx';
import { MainMenu } from './pages/main_page.jsx';

ReactDOM.render(
  <React.StrictMode>
    <MainMenu />
  </React.StrictMode>,
  document.getElementById('root')
);
