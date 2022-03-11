import React from 'react';
import * as config from '../util/config.js';
import { MenuText } from '../util/menu_text.js';
import { styles } from '../util/menu_styles.js';
import '../stylesheets/loading_screen.css';

export class LoadingScreen extends React.Component {
    constructor(props) {
        super(props);

        this.width = props.width;
        this.height = props.height;
        this.canvas = React.createRef();

        var fadeSeconds = 0.6;
        this.fadeFrameCount = fadeSeconds * 60;

        const alpha = 0.6;  // w
        const beta = 0.025; // h
        const gamma = 0.2;  // l
        const delta = 0.4;  // t

        const wiw = window.innerWidth;
        const wih = window.innerHeight;

        this.loadBarBorderWidth = wiw * alpha;
        this.loadBarBorderHeight = wih * beta;
        this.loadBarBorderLeft = wiw * gamma;
        this.loadBarBorderTop = wih * delta;

        const lambda = 0.0075; // h
        const xi = lambda / 2; // l

        this.loadBarTotalWidth = wiw * (alpha - xi);
        this.loadBarTotalHeight = wih * (beta - lambda);
        this.loadBarLeft = wiw * (gamma + xi/2);
        this.loadBarTop = wih * (delta + lambda/2);

        this.loadBarTextTop = wih * (delta - lambda * 1.5);

        this.fadeBuffer = this.fadeFrameCount * 2;

        this.state = {
            active: false,
            backgroundDrawn: false,
            loadComplete: false,
            fadeInComplete: false,
            fadeOutComplete: false,
            currentBarWidth: 0,
            fadeFrames: 0,
            bufferCount: 0,
            loadBarBufferCount: 0,
            loadBarBuffer: 1
        };
    }

    componentDidMount() {
        this.mounted = true;
        if (this.mounted) {
            this.timerID = setInterval(
                () => this.tick(), config.INTERVAL
            );
        }

        this.drawBackground();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    onClick(e) {
        this.setState({ active: true });
        this.drawBackground();
    }

    drawBackground() {
        var background = this.canvas.current;
        var ctx = background.getContext('2d');
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.width, this.height);

        // draw bar outline
        ctx.strokeRect(this.loadBarBorderLeft, this.loadBarBorderTop, this.loadBarBorderWidth, this.loadBarBorderHeight);
    }

    incrementFade() {
        if (this.state.fadeFrames === this.fadeFrameCount) {
            this.setState({ fadeInComplete: true });
        }
        else {
            this.setState({ fadeFrames: this.state.fadeFrames + 1 });
        }
    }

    decrementFade() {
        if (this.state.fadeFrames === 0) {
            this.resetState();
        }
        else {
            this.setState({ fadeFrames: this.state.fadeFrames - 1 });
        }
    }

    getRandomId(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
    }

    getRandomFilename() {
        return '/tmp/' + this.getRandomId(5) + '/' + this.getRandomId(7) + '/' + this.getRandomId(10) + '.jpg';
    }

    drawLoadBar(width) {
        var background = this.canvas.current;
        var ctx = background.getContext('2d');

        this.drawBackground();

        ctx.fillStyle = 'black';
        ctx.font = '10px monospace';
        ctx.fillRect(this.loadBarLeft, this.loadBarTop, width, this.loadBarTotalHeight);
        ctx.fillText(this.getRandomFilename(), this.loadBarLeft, this.loadBarTextTop);
    }

    getRandomInt(max) {
        max = Math.floor(max);

        return Math.floor(Math.random() * max);
    }

    getRandomRange(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min) + min);
    }

    incrementLoadBar() {
        var newWidth = this.state.currentBarWidth + this.getRandomInt(this.loadBarTotalWidth / 50);
        if (newWidth > this.loadBarTotalWidth) {
            this.setState({ loadComplete: true, currentBarWidth: 0, bufferCount: 0 });
            newWidth = this.loadBarTotalWidth;
        }
        else {
            this.setState({ currentBarWidth: newWidth });
        }

        this.drawLoadBar(newWidth);
    }

    resetState() {
        this.setState({
            active: false,
            backgroundDrawn: false,
            loadComplete: false,
            fadeInComplete: false,
            fadeOutComplete: false,
            currentBarWidth: 0,
            fadeFrames: 0,
            bufferCount: 0
        });
    }

    generateRandomBufferInterval() {
        if (this.getRandomInt(20) === 5) {
            return 15;
        }
        else {
            return this.getRandomInt(5);
        }
    }

    loadIncrementBuffer() {
        if (this.state.loadBarBufferCount < this.state.loadBarBuffer) {
            this.setState({ loadBarBufferCount: this.state.loadBarBufferCount + 1 });

            return false;
        }
        else {
            this.setState({ loadBarBufferCount: 0, loadBarBuffer: this.generateRandomBufferInterval() });

            return true;
        }
    }

    tick() {
        if (this.state.active) {
            if (!this.state.fadeInComplete) {
                this.incrementFade();
            }
            else if (this.state.fadeInComplete && this.state.bufferCount < this.fadeBuffer) {
                this.setState({ bufferCount: this.state.bufferCount + 1});
            }
            else if (this.state.bufferCount >= this.fadeBuffer && !this.state.loadComplete) {
                if (this.loadIncrementBuffer()) {
                    this.incrementLoadBar();
                }
            }
            else if (this.state.loadComplete && !this.state.fadeOutComplete) {
                this.decrementFade();
            }
        }
    }

    render() {
        const canvasStyle = {
            'position': 'fixed',
            'left': 0,
            'top': 0,
            'zIndex': 1000,
            'display': this.state.active ? 'block' : 'none',
            'opacity': this.state.fadeFrames / this.fadeFrameCount
        };

        return (
            <div class="textWrapper" onClick={ this.onClick.bind(this) }>
                click me
                <canvas class="loadingScreen" style={ canvasStyle } ref={ this.canvas } width={ this.width } height={ this.height } />
            </div>
        );
    }
}
