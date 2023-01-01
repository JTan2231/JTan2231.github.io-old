import React from 'react';
import * as config from '../util/config.js';

export class TextHighlight extends React.Component {
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

        let b = '(' + this.bezier[0] + ','
                    + this.bezier[1] + ','
                    + this.bezier[2] + ','
                    + this.bezier[3] + ')';

        let afterStyle = {  
            content: '',
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'black',
            transition: 'opacity '+this.duration+'s cubic-bezier'+b,
            width: '100%',
            height: '100%',
            left: '-0.3em',
            top: '-0.35em',
            padding: '0.25em',
            opacity: 0,
            zIndex: 0
        }

        let fontStyle = {
            transition: 'color '+this.duration+'s cubic-bezier'+b,
            fontFamily: config.FONT_FAMILY,
            fontSize: '12px',
            position: 'relative',
            cursor: 'default',
            zIndex: 1
        };

        if (this.state.mouseIn) {
            afterStyle = {
                ...afterStyle,
                ...{
                    opacity: 1,
                }
            };

            fontStyle = {
                ...fontStyle,
                ...{
                    color: 'white',
                }
            };
        }
        else {
            afterStyle = {
                ...afterStyle,
                ...{
                    opacity: 0,
                }
            };

            fontStyle = {
                ...fontStyle,
                ...{
                    color: 'black',
                }
            };
        }

        return (
            <div style={{ margin: 'auto', marginBottom: '3%', width: '100%' }}>
                <div style={ textStyle } onMouseEnter={ this.mouseEnter.bind(this) } onMouseLeave={ this.mouseLeave.bind(this) }>
                    <span style={ afterStyle } />
                    <div style={ fontStyle }>{ this.props.text }</div>
                </div>
            </div>
        );
    }
}
