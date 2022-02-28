import React from 'react';
import * as vec2d from './vec2d.js';
import * as mathUtils from './math_utils.js';
import * as config from './config.js';
import { backgroundText } from './background_text.js';
import { MenuText } from './menu_text.js';
import { Transition } from './transition.jsx';
import { styles } from './menu_styles.js';

class MenuSelections extends React.Component {
    constructor(props) {
        super(props);

        this.width = 0;
        this.height = 0;

        this.state = {
            count: 0,
            clock: 0,
            backgroundDrawn: false
        };

        this.small = props.small;

        this.mouse = {
            x: -1000,
            y: -1000
        };

        this.backgroundCanvas = React.createRef();
        this.leftBackgroundCanvas = React.createRef();
        this.circleCanvas = React.createRef();
    }

    componentDidMount() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.canvasWidth = this.width * config.TEXT_RATIO;
        this.leftOffset = this.width * (1-config.TEXT_RATIO);

        this.timerID = setInterval(
            () => this.tick(), config.INTERVAL
        );
    }

    tick() {
        if (!this.state.backgroundDrawn) {
            var background = this.leftBackgroundCanvas.current;
            var ctx = background.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, this.leftOffset, this.height);

            this.setState({ backgroundDrawn: true });
        }

        const can = this.leftBackgroundCanvas.current;
        const c = can.getContext('2d');
    }

    render() {
        var x = 'block';
        var w = this.width;
        if (this.small) {
            x = 'none';
            w = 0;
        }

        const pageStyle = {
            'userSelect': 'none',
            'height': this.height,
            'width': w,
            'position': 'fixed',
            'top': '0',
            'left': '0.43%',
            'display': x,
            //'zIndex': 100
        };

        var testStyle = styles.linkedinStyle;
        var gitTestStyle = styles.githubStyle;
        var contentStyle = styles.contentStyle;

        if (this.small) {
            const titleFontSize = '16px';
            const contentFontSize = '10px';

            testStyle.fontSize = titleFontSize;

            gitTestStyle.fontSize = titleFontSize;
            gitTestStyle.left = '0';

            contentStyle.fontSize = contentFontSize;
        }

        const menuTextStart = 5;
        var menuTextVar = menuTextStart;
        var links = [<MenuText text="kaggle" style={ contentStyle } url="https://www.kaggle.com/jtan2231" number={ menuTextVar++ }/>,
                     <MenuText text="website source" style={ contentStyle } url="https://github.com/JTan2231/JTan2231.github.io/tree/dev" number={ menuTextVar++ }/>,
                     <MenuText text="depth estimation" style={ contentStyle } url="https://github.com/JTan2231/depth-prediction" number={ menuTextVar++ }/>,
                     <MenuText text="echo state network" style={ contentStyle } url="https://github.com/JTan2231/ESN" number={ menuTextVar++ }/>];

        var media = [<MenuText text="github" style={ gitTestStyle } url="https://www.github.com/JTan2231" number="1"/>,
                     <MenuText text="linkedin" style={ testStyle } url="https://www.linkedin.com/in/joseph-tan-478aa5186/" number="1"/>,
                     <MenuText text="twitter" style={ testStyle } url="https://www.twitter.com/joeymtan/" number="2"/>];

        var finalMedia = media;
        var finalLinks = links;
        if (this.small) {
            finalMedia = [<MenuText text="github" style={ gitTestStyle } url="https://www.github.com/JTan2231" number="1"/>,
                          <MenuText text="linkedin" style={ testStyle } url="https://www.linkedin.com/in/joseph-tan-478aa5186/" number="2"/>,
                          <MenuText text="twitter" style={ testStyle } url="https://www.twitter.com/joeymtan/" number="3"/>];

            finalLinks = [<MenuText text="kaggle" style={ contentStyle } url="https://www.kaggle.com/jtan2231" number={ menuTextStart+2 }/>,
                          <MenuText text="website source" style={ contentStyle } url="https://github.com/JTan2231/JTan2231.github.io/tree/dev" number={ menuTextStart+4 }/>,
                          <MenuText text="depth estimation" style={ contentStyle } url="https://github.com/JTan2231/depth-prediction" number={ menuTextStart+6 }/>,
                          <MenuText text="echo state network" style={ contentStyle } url="https://github.com/JTan2231/ESN" number={ menuTextStart+8 }/>];
        }

        return (
            <div style={ pageStyle }>
                { finalMedia }
                { finalLinks }
                <canvas style={ styles.leftBackgroundStyle } ref={ this.leftBackgroundCanvas } width={ this.leftOffset } height={ this.height }/>
            </div>
        );
    }
}

export default MenuSelections;
