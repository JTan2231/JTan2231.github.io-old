import React from 'react';
import * as vec2d from './vec2d.js';
import * as mathUtils from './math_utils.js';
import * as config from './config.js';
import { backgroundText } from './background_text.js';
import { MenuText } from './menu_text.js';
import { styles } from './menu_styles.js';
import PhysicsMenu from './menu_backdrop.jsx';
import MenuSelections from './menu_selections.jsx';
import { Transition } from './transition.jsx';

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

        this.textIndex = mathUtils.randomInt(backgroundText.length);

        this.state = {
            transition: 0,
            cont: false,
            halfway: false,
            rendering: true
        }

        this.transition = React.createRef();
    }

    tick() {
        if (this.transition !== undefined && this.transition !== null) {
            var halfway = this.transition.current.state.halfway;
            var rendering = this.transition.current.state.rendering;

            this.setState({ cont: halfway, rendering: rendering });
        }
    }

    componentDidMount() {
        this.mounted = true;
        if (this.mounted) {
            this.timerID = setInterval(
                () => this.tick(), config.INTERVAL
            );
        }
    }

    render() {
        var x;
        if (this.state.rendering) {
            x = 'none';
        }
        else {
            x = 'block';
        }
        const style = {
            'display': x,
            'font-size': '100px',
            'left': '50%',
            'top': '50%',
            'position': 'absolute',
            'zIndex': 50
        };

        return (
            <div>
                <MenuSelections />
                <Transition ref={ this.transition } cont={ this.state.cont } totalWidth={ window.innerWidth * config.TEXT_RATIO } height={ window.innerHeight }/>
                <div style={ style }>testing</div>
                <PhysicsMenu textIndex={ this.textIndex } rendering={ this.state.rendering } width={ this.width } height = { this.height } />
            </div>
        );
    }
}

export default MainMenu;
