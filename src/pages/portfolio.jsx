import React from 'react';
import * as mathUtils from '../util/math_utils.js';
import * as config from '../util/config.js';
import { backgroundText } from '../util/background_text.js';
import PhysicsMenu from '../components/menu_backdrop.jsx';
import { TextUnderline } from '../components/text_underline.jsx';
import { TextDecode } from '../components/text_decode.jsx';
import { TextFlip } from '../components/text_flip.jsx';
import { TextSlide } from '../components/text_slide.jsx';
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

        this.state = {}
    }

    render() {
        const aboutStyle = {
            width: '40vw',
            height: '40vh',
            position: 'fixed',
            left: 'calc(50vw - 20vw)',
            top: 'calc(50vh - 20vh)',
            backgroundColor: 'white',
        };

        return (
            <div>
                <PhysicsMenu textIndex={ this.textIndex } rendering={ true } portfolio={ true } width={ this.width } height={ this.height } />
            </div>
        );
    }
}
