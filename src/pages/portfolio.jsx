import React from 'react';
import * as mathUtils from '../util/math_utils.js';
import * as config from '../util/config.js';
import { backgroundText } from '../util/background_text.js';
import PhysicsMenu from '../components/menu_backdrop.jsx';
import { TextHighlight } from '../components/text_highlight.jsx';
import { Floaty } from '../components/floaty.jsx';

export class Portfolio extends React.Component {
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
        this.setState({ rendering: true });
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
        const allProps = {
            'depthPrediction': {
                'highlightProps': {
                    'textStyle': {
                        'fontSize': '18px',
                        'fontFamily': 'Courier New',
                        'marginTop': '0.5%',
                        'lineHeight': '36px'
                    },

                    'wrapperStyle': {
                        'position': 'relative',
                    },

                    'fontSize': '18px',
                    'totalWidth': window.innerWidth,
                },

                'floatyProps': {
                    'radius': 50,
                    'width': window.innerWidth * 0.3,
                    'height': window.innerHeight * 0.3,
                }
            }
        }

        return (
            <div>
                <PhysicsMenu textIndex={ this.textIndex } rendering={ true } portfolio={ true } width={ this.width } height={ this.height } />

                <div>
                    <a href="mailto:j.tan2231@gmail.com" style={{ 'position': 'absolute' }}>
                        <TextHighlight text="contact" { ...allProps['depthPrediction']['highlightProps'] }
                                       wrapperStyle={{ 'top': window.innerHeight*0.0125 + 'px', 'left': window.innerWidth*0.225 + 'px' }} />
                    </a>
                    <Floaty root={ ['10%', '3.5%'] } { ...allProps['depthPrediction']['floatyProps'] } height={ window.innerHeight*0.16 } elements= { [
                        <div style={{ 'fontFamily': 'monospace', 'fontSize': '16px', 'marginRight': '5%', 'marginLeft': '5%' }}>
                            <div>
                                <p>email: 
                                    <a href="mailto:j.tan2231@gmail.com">
                                        j.tan2231@gmail.com
                                    </a>
                                </p>
                            </div>
                            <a href="https://github.com/JTan2231/">
                                <p>Github</p>
                            </a>
                            <a href="https://www.linkedin.com/in/joseph-tan-478aa5186/">
                                <p>LinkedIn</p>
                            </a>
                            <a href="https://www.kaggle.com/jtan2231/">
                                <p>Kaggle</p>
                            </a>
                        </div>
                    ] } />
                </div>

                <div>
                    <a href="https://github.com/JTan2231/ESN" style={{ 'position': 'absolute' }}>
                        <TextHighlight text="echo state network" { ...allProps['depthPrediction']['highlightProps'] }
                                       wrapperStyle={{ 'top': window.innerHeight*0.32 + 'px', 'left': window.innerWidth*0.21 + 'px' }} />
                    </a>
                    <Floaty root={ ['11.8%', '19.6%'] } { ...allProps['depthPrediction']['floatyProps'] } elements= { [
                        <div style={{ 'fontFamily': 'monospace', 'fontSize': '16px', 'marginRight': '5%', 'marginLeft': '5%' }}>
                            <p>C implementation of an echo state network approximating a simple sine wave</p>
                            <p>Developed from scratch -- zero libraries used (except for visualization)</p>
                            <p>Relevant linear algebra operations part of source code</p>
                            <p>Sparse matrix implementation to avoid redundant zero-calculations</p>
                        </div>
                    ] } />
                </div>

                <div>
                    <a href="https://github.com/JTan2231/JTan2231.github.io/tree/dev" style={{ 'position': 'absolute' }}>
                        <TextHighlight text="this website" { ...allProps['depthPrediction']['highlightProps'] }
                                       wrapperStyle={{ 'top': window.innerHeight*0.0605 + 'px', 'left': window.innerWidth*0.6 + 'px' }} />
                    </a>
                    <Floaty root={ ['49%', '6%'] } { ...allProps['depthPrediction']['floatyProps'] } elements= { [
                        <div style={{ 'fontFamily': 'monospace', 'fontSize': '16px', 'marginRight': '5%', 'marginLeft': '5%' }}>
                            <p>Graphics and interface developed by me using ReactJS</p>
                            <p>Hover over project titles to see source code</p>
                            <p>All projects open source</p>
                            <p>See my LinkedIn profile for work experience</p>
                        </div>
                    ] } />
                </div>

                <div>
                    <a href="https://github.com/JTan2231/depth-prediction" style={{ 'position': 'absolute' }}>
                        <TextHighlight text="monocular depth prediction" { ...allProps['depthPrediction']['highlightProps'] }
                                       wrapperStyle={{ 'top': window.innerHeight*0.52 + 'px', 'left': window.innerWidth*0.59 + 'px' }} />
                    </a>
                    <Floaty root={ ['52%', '30%'] } { ...allProps['depthPrediction']['floatyProps'] } elements= { [
                        <div style={{ 'fontFamily': 'monospace', 'fontSize': '16px', 'marginRight': '5%', 'marginLeft': '5%' }}>
                            <p>Monocular depth and egomotion estimation neural network</p>
                            <p>Implemented with python3 and TensorFlow 2</p>
                            <p>Completely unsupervised -- only images required, no labels</p>
                            <p>Pre-trained weights provided</p>
                        </div>
                    ] } />
                </div>
            </div>
        );
    }
}
