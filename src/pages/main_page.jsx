import React from 'react';
import * as mathUtils from '../util/math_utils.js';
import * as config from '../util/config.js';
import { Portfolio } from './portfolio.jsx';
import { Playground } from './playground.jsx';

export class MainMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            portfolio: true
        };
    }

    mouseClick(e) {
        this.setState({ portfolio: !this.state.portfolio });
    }

    render() {
        const buttonStyle = {
            position: 'absolute',
            left: '5px',
            top: '5px',
            zIndex: 100,
            cursor: 'default',
            fontFamily: 'monospace',
            fontSize: '10px'
        };

        var div;
        if (this.state.portfolio) {
            div = (
                <div style={ buttonStyle } onClick={ this.mouseClick.bind(this) }>
                    are.na
                </div>
            );
        }
        else {
            div = (
                <div style={ buttonStyle } onClick={ this.mouseClick.bind(this) }>
                    portfolio&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a collection of images i like
                </div>
            );
        }

        return (
            <div>
                { div }
                <div style={{ display: this.state.portfolio ? 'block' : 'none' }}>
                    <Portfolio />
                </div>
                <div style={{ display: !this.state.portfolio ? 'block' : 'none', position: 'absolute', overflow: 'scroll', top: '30px' }}>
                    <Playground />
                </div>
            </div>
        );
    }
}
