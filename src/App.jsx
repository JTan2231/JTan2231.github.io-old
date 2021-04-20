import React from 'react';
import ReactDOM from 'react-dom';
import { FancyText } from './app_element.jsx';
import { SimulatorVisual } from './new_simulator.jsx';
import { PhysicsMenu } from './menu_physics.jsx';

const rootEl = document.getElementById('root');
ReactDOM.render(<PhysicsMenu/>, rootEl);

if (module.hot) {
    module.hot.accept('./components/App.jsx', () => renderApp());
}
