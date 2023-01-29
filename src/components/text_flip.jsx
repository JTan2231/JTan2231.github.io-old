import React from 'react';
import * as config from '../util/config.js';

export class TextFlip extends React.Component {
    constructor(props) {
        super(props);

        this.mounted = false;

        this.bezier = props.bezier ? props.bezier : [1, 1, 1, 1];
        this.duration = props.duration ? props.duration : 1;

        this.state = {
            mouseIn: false
        };
    }

    mouseEnter(e) {
        this.setState({ mouseIn: true });
    }

    mouseLeave(e) {
        this.setState({ mouseIn: false });
    }

    render() {
        const textStyle = {
            width: 'fit-content',
            height: 'max-content',
            position: 'relative',
            margin: '0 auto'
        };

        var b = '(' + this.bezier[0] + ','
                    + this.bezier[1] + ','
                    + this.bezier[2] + ','
                    + this.bezier[3] + ')';

        var afterStyle = {  
            position: 'absolute',
            transition: 'transform '+this.duration+'s cubic-bezier'+b,
            transformOrigin: '0 0 0',
            height: '100%',
            left: '0',
            color: 'blue'
        };

        var mainStyle = {
            position: 'relative',
            transition: 'transform '+this.duration+'s cubic-bezier'+b,
            transformOrigin: '0 0 0',
            height: '100%',
            left: '0'
        };

        if (this.state.mouseIn) {
            afterStyle = {
                ...afterStyle,
                ...{
                    transform: 'translateY(-100%) rotateX(0deg)',
                }
            };

            mainStyle = {
                ...mainStyle,
                ...{
                    transform: 'rotateX(90deg)',
                }
            };
        }
        else {
            afterStyle = {
                ...afterStyle,
                ...{
                    transform: 'translateY(0%) rotateX(-90deg)',
                }
            };

            mainStyle = {
                ...mainStyle,
                ...{
                    transform: 'rotateX(0deg)',
                }
            };
        }

        return (
            <div>
                <div style={ textStyle } onMouseEnter={ this.mouseEnter.bind(this) } onMouseLeave={ this.mouseLeave.bind(this) }>
                    <div style={ mainStyle }>{ this.props.text }</div>
                    <div style={ afterStyle }>{ this.props.text }</div>
                </div>
            </div>
        );
    }
}
