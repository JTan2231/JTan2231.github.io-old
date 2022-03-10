import React from 'react';
import * as config from '../util/config.js';
import { styles } from '../util/menu_styles.js';
import '../stylesheets/text_highlight.css';

export class TextHighlight extends React.Component {
    constructor(props) {
        super(props);

        this.text = props.text;
        this.frequency = 1;
        this.totalWidth = props.totalWidth;
        this.fontHeight = parseInt(props.fontSize.substring(0, 2));

        var delta = 0.6;
        this.totalCanvasWidth = this.text.length * this.fontHeight * delta + 14;
        this.height = props.height;
        this.leftDefault = ((1-config.TEXT_RATIO)) * window.innerWidth;
        this.duration_seconds = 0.9;
        this.duration = 60 * this.duration_seconds; // 60 fps -> 1 second total duration
        this.maxVel = (2*this.totalCanvasWidth) / this.duration;
        this.minVel = 0;
        this.baseAccel = (this.maxVel*this.maxVel) / (2*this.totalCanvasWidth)//(2*this.totalCanvasWidth)/(this.duration*this.duration);

        this.textStyle = props.textStyle;
        this.wrapperStyle = props.wrapperStyle;

        this.canvasWidth = 0;
        this.canvasHeight = 0;

        this.fontSize = props.fontSize;

        this.backgroundCanvas = React.createRef();
        this.divText = React.createRef();

        this.smallScreen = props.small;

        this.tol = 0.5;

        this.state = {
            moving: false,
            width: 0,
            right: false,
            velocity: this.maxVel,
            acceleration: this.baseAccel,
            left: this.leftDefault,
            regressing: false,
            halfway: false,
            cont: props.cont,
            rendering: true,
            mouseIn: false
        };
    }

    componentDidMount() {
        this.mounted = true;
        if (this.mounted) {
            this.timerID = setInterval(
                () => this.tick(), config.INTERVAL
            );

            this.canvasWidth = 1;//this.fontSize * this.divText.current.textContent.length;
            this.canvasHeight = 24;
            this.setState({ width: this.canvasWidth });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.mouseIn !== undefined && this.state.mouseIn !== prevProps.mouseIn) {
            if (prevProps.mouseIn === true) {
                this.divText.current.dispatchEvent(new MouseEvent('mouseover'));
                this.setState({
                    mouseIn: true,
                    width: 0,
                    velocity: this.maxVel
                });
            }
            else {
                this.setState({
                    mouseIn: false,
                    width: this.totalCanvasWidth,
                    velocity: this.maxVel
                });
            }
        }
    }

    fillCanvas(width, height) {
        const backgroundCanvas = this.backgroundCanvas.current;
        const ctx = backgroundCanvas.getContext('2d');

        ctx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
    }

    animateRight() {
        var width = this.state.width;
        var vel = this.state.velocity;
        var accel = this.state.acceleration;

        vel = Math.max(3, vel-accel);

        var newWidth = width + vel;
        // we've made it to the end
        if (newWidth+this.tol >= this.totalCanvasWidth) {
            width = this.totalCanvasWidth;
            vel = 0;
            this.setState({ mouseIn: true });
        }
        else {
            width = newWidth;
        }

        width = Math.min(this.backgroundCanvas.current.width, width);
        this.fillCanvas(width, this.backgroundCanvas.current.height);

        this.setState({
            width: width,
            velocity: vel,
            acceleration: accel
        });
    }

    animateLeft() {
        var width = this.state.width;
        var vel = this.state.velocity;
        var accel = this.state.acceleration;

        vel = Math.max(3, vel-accel);

        var newWidth = width - vel;
        // we've made it to the end
        if (newWidth-this.tol <= this.tol) {
            width = 0;
            vel = 0;
            this.setState({ mouseIn: false });
        }
        else {
            width = newWidth;
        }

        width = Math.max(0, width);
        this.fillCanvas(width, this.backgroundCanvas.current.height);

        this.setState({
            width: width,
            velocity: vel,
            acceleration: accel
        });
    }

    onClick(e) { 
        this.setState({ moving: true });
    }

    makeAccelPositive() {
        if (this.state.acceleration < 0) {
            this.setState({ acceleration: this.state.acceleration * -1 });
        }
    }

    mouseEnter(e) {
        this.makeAccelPositive();
        this.divText.current.dispatchEvent(new MouseEvent('mouseover'));
        this.setState({
            mouseIn: true,
            width: 0,
            velocity: this.maxVel
        });
    }

    mouseLeave(e) {
        this.makeAccelPositive();
        this.setState({
            mouseIn: false,
            width: this.totalCanvasWidth,
            velocity: this.maxVel
        });
    }

    tick() {
        if (this.backgroundCanvas.current) {
            if (this.state.mouseIn) {
                this.animateRight();
            }
            else {
                this.animateLeft();
            }
        }
    }

    render() {
        var textStyle = { 'filler': null };
        var textWrapperStyle = { ...{ 'height': 2*this.fontHeight} };

        if (this.textStyle) {
            textStyle = { ...textStyle, ...this.textStyle };
        }

        if (this.wrapperStyle) {
            textWrapperStyle = { ...textWrapperStyle, ...this.wrapperStyle };
            if (!textWrapperStyle.width) {
                textWrapperStyle = { ...textWrapperStyle, ...{ 'width': this.totalCanvasWidth } };
            }
        }

        return (
            <div class="textWrapper" style={ textWrapperStyle } onMouseEnter={ this.mouseEnter.bind(this) } onMouseLeave={ this.mouseLeave.bind(this) }>
                <canvas style={{ 'zIndex': 50, 'position': 'absolute', 'left': '-0.4em' }} ref={ this.backgroundCanvas } width={ this.totalCanvasWidth } height={ 36 } />
                <div class="text" style={ textStyle } ref={ this.divText }>
                    { this.text }
                </div>
            </div>
        );
    }
}
