import React from 'react';
import * as mathUtils from '../util/math_utils.js';
import * as config from '../util/config.js';
import { backgroundText } from '../util/background_text.js';
import PhysicsMenu from './menu_backdrop.jsx';
import MenuSelections from './menu_selections.jsx';
import { Transition } from './transition.jsx';
import { Writings } from './writings.jsx';

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
        var rendering = this.state.rendering;
        var smallScreen = false;
        if (this.width < 500) {
            rendering = false;
            smallScreen = true;
        }

        return (
            <div>
                <MenuSelections small={ smallScreen } />
                <Transition ref={ this.transition } small={ smallScreen } text={ "Writings" } cont={ this.state.cont } totalWidth={ window.innerWidth * config.TEXT_RATIO } height={ window.innerHeight } />
                <Writings display={ !rendering } small={ smallScreen } />
                <PhysicsMenu textIndex={ this.textIndex } rendering={ rendering } width={ this.width } height = { this.height } />
            </div>
        );
    }
}

export default MainMenu;
