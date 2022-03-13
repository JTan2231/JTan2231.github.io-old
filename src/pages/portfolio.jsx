import React from 'react';
import * as mathUtils from '../util/math_utils.js';
import * as config from '../util/config.js';
import { backgroundText } from '../util/background_text.js';
import PhysicsMenu from '../components/menu_backdrop.jsx';
import { TextUnderline } from '../components/text_underline.jsx';
import { TextDecode } from '../components/text_decode.jsx';
import { TextFlip } from '../components/text_flip.jsx';
import { Floaty } from '../components/floaty.jsx';
import { LoadingScreen } from '../components/loading_screen.jsx';
import '../stylesheets/portfolio.css';

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
        this.bezier = [0.8, 0.2, 0.3, 0.9];
        this.bDuration = 0.4;

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
                <div style={{ 'position': 'fixed', 'left': 0, 'top': 0, 'zIndex': 1000, 'fontFamily': 'monospace', 'fontSize': '12px', 'cursor': 'default' }}>
                    <LoadingScreen height={ window.innerHeight } width={ window.innerWidth } />
                </div>

                <div>
                    <Floaty root={ ['10%', '3.5%'] } { ...allProps['depthPrediction']['floatyProps'] } height={ window.innerHeight*0.16 } elements= { [
                        <div style={{ 'fontFamily': 'monospace', 'fontSize': '16px', 'marginRight': '5%', 'marginLeft': '5%' }}>
                            <div>
                                <p>
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
                    <a href="https://github.com/JTan2231/ESN" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                        <Floaty root={ ['11.8%', '19.6%'] } { ...allProps['depthPrediction']['floatyProps'] } elements= { [
                            <div style={{ 'fontFamily': 'monospace', 'fontSize': '16px', 'marginRight': '5%', 'marginLeft': '5%' }}>
                                <div style={{ 'width': '50%', 'margin': '5% auto', 'fontSize': '20px' }}>
                                    <TextUnderline text="Echo State Network" bezier={ this.bezier } duration={ this.bDuration } />
                                </div>
                                <p>C implementation of an echo state network approximating a sine wave</p>
                                <p>Developed from scratch, save for visualization</p>
                                <p>Relevant linear algebra operations -- matrix inverse, eigenvalue calculations</p>
                                <p>Sparse and dense matrix implementations</p>
                            </div>
                        ] } />
                    </a>
                </div>

                <div>
                    <a href="https://github.com/JTan2231/JTan2231.github.io/tree/dev" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                        <Floaty root={ ['49%', '6%'] } { ...allProps['depthPrediction']['floatyProps'] } elements= { [
                            <div style={{ 'fontFamily': 'monospace', 'fontSize': '16px', 'marginRight': '5%', 'marginLeft': '5%' }}>
                                <div style={{ 'width': '50%', 'margin': '5% auto', 'fontSize': '20px' }}>
                                    <TextUnderline text="This Website" bezier={ this.bezier } duration={ this.bDuration } />
                                </div>
                                <p><TextDecode text="Graphics and interface developed using ReactJS" /></p>
                                <p><TextDecode text="Click project titles to see source code" /></p>
                                <p><TextDecode text="All projects open source" /></p>
                                <p><TextDecode text="See my LinkedIn profile for work experience" /></p>
                            </div>
                        ] } />
                    </a>
                </div>

                <div>
                    <a href="https://github.com/JTan2231/depth-prediction" style={{ 'textDecoration': 'none', 'color': 'black' }}>
                        <Floaty root={ ['52%', '30%'] } { ...allProps['depthPrediction']['floatyProps'] } elements= { [
                            <div style={{ 'fontFamily': 'monospace', 'fontSize': '16px', 'marginRight': '5%', 'marginLeft': '5%' }}>
                                <div style={{ 'width': '50%', 'margin': '5% auto', 'fontSize': '20px' }}>
                                    <TextUnderline text="Depth Estimation" bezier={ this.bezier } duration={ this.bDuration } />
                                </div>
                                <p><TextFlip text="Monocular depth and egomotion estimation neural network" bezier={ this.bezier } duration={ this.bDuration } /></p>
                                <p><TextFlip text="Implemented with python 3 and TensorFlow 2" bezier={ this.bezier } duration={ this.bDuration } /></p>
                                <p><TextFlip text="Completely unsupervised -- image-only input" bezier={ this.bezier } duration={ this.bDuration } /></p>
                                <p><TextFlip text="Pre-trained weights provided" bezier={ this.bezier } duration={ this.bDuration } /></p>
                            </div>
                        ] } />
                    </a>
                </div>
            </div>
        );
    }
}
