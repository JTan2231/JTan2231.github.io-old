import React from 'react';
import ReactDOM from 'react-dom';
import { FancyText } from './app_element.jsx';
import { SimulatorVisual } from './new_simulator.jsx';
//import { PhysicsMenu } from './menu_physics.jsx';
//import { MainMenu } from './main_page.jsx';

const rootEl = document.getElementById('root');
ReactDOM.render(<MainMenu/>, rootEl);

if (module.hot) {
    module.hot.accept('./components/App.jsx', () => renderApp());
}
