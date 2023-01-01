import React from 'react';
import * as config from '../util/config.js';

export class TextSlide extends React.Component {
    constructor(props) {
        super(props);

        this.mounted = false;

        this.bezier = props.bezier ? props.bezier : [1, 1, 1, 1];
        this.duration = props.duration ? props.duration : 1;

        this.state = {
            mouseIn: false,
            currentIdx: -1,
        };
    }

    componentDidMount() {
        this.mounted = true;
        if (this.mounted) {
            this.timerID = setInterval(
                () => this.tick(), config.INTERVAL * 2
            );
        }
    }

    mouseEnter(e) {
        var newIdx = this.state.currentIdx === this.props.text.length ? 0 : this.state.currentIdx;
        this.setState({ mouseIn: true, currentIdx: newIdx });
    }

    mouseLeave(e) {
        this.setState({ mouseIn: false });
    }

    tick() {
        if (this.state.currentIdx < this.props.text.length) {
            this.setState({ currentIdx: this.state.currentIdx + 1 });
        }
    }

    render() {
        const textStyle = {
            width: 'fit-content',
            position: 'relative',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
        };

        var b = '(' + this.bezier[0] + ','
                    + this.bezier[1] + ','
                    + this.bezier[2] + ','
                    + this.bezier[3] + ')';

        const baseDivStyle = {  
            position: 'relative',
            transition: 'color '+this.duration*4+'s, transform '+this.duration+'s cubic-bezier'+b,
            transformOrigin: '0 0 0',
            transform: 'translateY(0%)',
            height: '100%',
            left: '0',
            color: 'black',
            flex: 0
        };

        const chars = this.props.text.split('');
        var divs = [];
        for (var i = 0; i < chars.length; i++) {
            var curC = chars[i];
            var prevC;
            if (i === 0) {
                prevC = chars[chars.length-1];
            }
            else {
                prevC = chars[i-1];
            }

            const effPrevIdx = this.state.currentIdx === 0 ? this.props.text.length - 1 : this.state.currentIdx - 1;

            var divStyle;
            if (i === this.state.currentIdx) {
                divStyle = {
                    ...baseDivStyle,
                    ...{
                        transform: 'translateY(100%)',
                        color: 'white',
                        transition: 'none',
                    }
                };
            }
            else {
                divStyle = baseDivStyle;
            }

            const c = chars[i];
            if (c === ' ') {
                divs.push(<div style={ divStyle }>&nbsp;</div>);
            }
            else {
                divs.push(<div style={ divStyle }>{ chars[i] }</div>);
            }
        }

        return (
            <div>
                <div style={ textStyle } onMouseEnter={ this.mouseEnter.bind(this) } onMouseLeave={ this.mouseLeave.bind(this) }>
                    { divs }
                </div>
            </div>
        );
    }
}
