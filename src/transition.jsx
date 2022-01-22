import React from 'react';
import * as config from './config.js';
import { MenuText } from './menu_text.js';
import { styles } from './menu_styles.js';

export class Transition extends React.Component {
    constructor(props) {
        super(props);

        this.frequency = 1;
        this.totalWidth = props.totalWidth;
        this.height = props.height;
        this.leftDefault = ((1-config.TEXT_RATIO)) * window.innerWidth;
        this.duration_seconds = config.TRANSITION_DELAY_SECONDS;
        this.duration = 60 * this.duration_seconds; // 60 fps -> 1 second total duration
        this.maxVel = (this.totalWidth) / this.duration;
        this.minVel = 0;
        this.baseAccel = this.totalWidth / (this.duration*this.duration);
        this.transitionCanvas = React.createRef();

        this.tol = 0.5;

        this.state = {
            moving: false,
            width: 0,
            right: false,
            velocity: 0,
            acceleration: this.baseAccel,
            left: this.leftDefault,
            regressing: false,
            halfway: false,
            cont: props.cont,
            rendering: true
        };
    }

    componentDidMount() {
        this.mounted = true;
        if (this.mounted) {
            this.timerID = setInterval(
                () => this.tick(), this.frequency
            );
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.cont !== prevProps.cont) {
            this.setState({ cont: prevProps.cont });
        }
    }

    slideRight() {
        var width = this.state.width;
        var vel = this.state.velocity;
        var accel = this.state.acceleration;
        var left = this.state.left;
        var moving = true;
        var regressing = this.state.regressing;
        var halfway = this.totalWidth / 2;

        vel = Math.min(this.maxVel, vel+accel);

        if (!this.state.regressing) {
            var newWidth = width + vel;
            // we've made it to the end
            if (newWidth+this.tol >= this.totalWidth) {
                width = this.totalWidth;
                accel *= -1;
                vel = 0;
                regressing = true;
                this.setState({ halfway: true, rendering: false });
            }
            else {
                // pre-halfway -- check for acceleration change
                if (width < halfway && newWidth >= halfway) {
                    accel *= -1;
                }
                width = newWidth;
            }

            this.setState({
                width: width,
                velocity: vel,
                acceleration: accel,
                moving: moving,
                regressing: regressing
            });
        }
        else {
            var newWidth = width - vel;
            var newLeft = left + vel;

            if (this.state.halfway) {
                this.setState({ halfway: false });
            }

            // we've made it to the end
            if (newLeft+this.tol >= this.totalWidth+this.leftDefault) {
                left = window.innerWidth;
                width = 0;
                accel *= -1;
                vel = 0;
                moving = false;
                regressing = false;
            }
            else {
                // pre-halfway -- check for acceleration change
                if (width > halfway && newWidth <= halfway) {
                    accel *= -1;
                }
                width = newWidth;
                left = newLeft;
            }

            this.setState({
                width: width,
                velocity: vel,
                acceleration: accel,
                moving: moving,
                left: left,
                regressing: regressing
            });
        }

        if (this.state.moving === false && this.state.left === window.innerWidth) {
            this.setState({ right: true });
        }
    }

    slideLeft() {
        var width = this.state.width;
        var vel = this.state.velocity;
        var accel = this.state.acceleration;
        var left = this.state.left;
        var moving = true;
        var regressing = this.state.regressing;
        var halfway = this.totalWidth / 2;

        vel = Math.min(this.maxVel, vel+accel);

        if (!this.state.regressing) {
            var newWidth = width + vel;
            var newLeft = left - vel;
            // we've made it to the end
            if (newWidth+this.tol >= this.totalWidth) {
                width = this.totalWidth;
                left = this.leftDefault;
                accel *= -1;
                vel = 0;
                regressing = true;
                this.setState({ halfway: true, rendering: true });
            }
            else {
                // pre-halfway -- check for acceleration change
                if (width < halfway && newWidth >= halfway) {
                    accel *= -1;
                }
                width = newWidth;
                left = newLeft;
            }

            this.setState({
                width: width,
                velocity: vel,
                acceleration: accel,
                moving: moving,
                left: left,
                regressing: regressing
            });
        }
        else {
            var newWidth = width - vel;

            if (this.state.halfway) {
                this.setState({ halfway: false });
            }

            // we've made it to the end
            if (newWidth-this.tol <= 0) {
                width = 0;
                accel *= -1;
                vel = 0;
                moving = false;
                regressing = false;
            }
            else {
                // pre-halfway -- check for acceleration change
                if (width > halfway && newWidth <= halfway) {
                    accel *= -1;
                }
                width = newWidth;
            }

            this.setState({
                width: width,
                velocity: vel,
                acceleration: accel,
                moving: moving,
                regressing: regressing
            });
        }

        if (this.state.left === this.leftDefault && this.state.width === 0) {
            this.setState({ right: false });
        }
    }

    onClick(e) { 
        this.setState({ moving: true });
    }

    tick() {
        if (this.state.halfway) {
            if (this.state.cont) {
                this.setState({ halfway: false, cont: false });
            }
        }
        else if (this.state.moving) {
            if (!this.state.right) {
                this.slideRight();
            }
            else {
                this.slideLeft();
            }
        }
    }

    render() {
        const transitionBackgroundStyle = {
            'position': 'absolute',
            'top': '0px',
            'left': this.state.left+'px',
            'background': config.BACKGROUND_COLOR,
            'width': this.state.width+'px',
            'height': window.innerHeight+'px',
            'zIndex': 100
        };
        return (
            <div>
                <div style={ transitionBackgroundStyle }/>
                <div onClick={ this.onClick.bind(this) }>
                    <MenuText text="transition me" style={ styles.linkedinStyle } url="" number="25"/>
                </div>
            </div>
        );
    }
}
