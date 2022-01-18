import React from 'react';
import * as vec2d from './vec2d.js';
import * as mathUtils from './math_utils.js';
import * as config from './config.js';
import { backgroundText } from './background_text.js';
import { MenuText } from './menu_text.js';
import { styles } from './menu_styles.js';
import PhysicsMenu from './menu_backdrop.jsx';
import MenuSelections from './menu_selections.jsx';

class MainMenu extends React.Component {
    constructor(props) {
        super(props);

        if (props.width === undefined && props.height === undefined) {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        }
        else {
            this.width = props.width;
            this.height = props.height;
        }
    }

    render() {
        return (
            <div>
                <PhysicsMenu width={ this.width } height = { this.height } />
                <MenuSelections />
            </div>
        );
    }
}

export default MainMenu;
