import React from 'react';
import * as config from '../util/config.js';

export class TextUnderline extends React.Component {
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
            content: '',
            position: 'absolute',
            bottom: 0,
            borderBottom: '1px solid black',
            backgroundColor: 'black',
            transition: 'transform '+this.duration+'s cubic-bezier'+b,
            width: '100%',
            left: '0',
        }

        if (this.state.mouseIn) {
            afterStyle = {
                ...afterStyle,
                ...{
                    transform: 'scale(1, 1)',
                    transformOrigin: 'left'
                }
            };
        }
        else {
            afterStyle = {
                ...afterStyle,
                ...{
                    transform: 'scaleX(0)',
                    transformOrigin: 'right'
                }
            };
        }

        return (
            <div>
                <div style={ textStyle } onMouseEnter={ this.mouseEnter.bind(this) } onMouseLeave={ this.mouseLeave.bind(this) }>
                    { this.props.text }
                    <div style={ afterStyle } />
                </div>
            </div>
        );
    }
}
