import React from 'react';
import * as mathUtils from '../util/math_utils.js';
import { backgroundText } from '../util/background_text.js';
import PhysicsMenu from '../components/menu_backdrop.jsx';
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
        return (
            <div>
                <PhysicsMenu textIndex={this.textIndex} rendering={true} portfolio={true} width={this.width} height={this.height} modal={this.props.modal} />
            </div>
        );
    }
}
