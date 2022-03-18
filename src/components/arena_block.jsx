import React from 'react';
import * as vec2d from '../util/vec2d.js';
import * as config from '../util/config.js';

export class ArenaBlock extends React.Component {
    constructor(props) {
        super(props);

        this.outlineDuration = 60;

        this.state = {
            clock: 0
        };

        this.divRef = React.createRef();
    }

    componentDidMount() {
        this.mounted = true;

        if (this.mounted) {
            this.timerID = setInterval(
                () => this.tick(), config.INTERVAL
            );
        }
    }

    tick() {
        if (this.state.clock < this.outlineDuration) {
            this.setState({ clock: this.state.clock + 1 });
        }
    }

    mouseEnter(e) {
        this.setState({ mouseIn: true });
    }

    mouseLeave(e) {
        this.setState({ mouseIn: false });
    }

    render() {
        const w = this.props.imageWidth + 2*this.props.margin;
        const h = this.props.imageHeight + 2*this.props.margin;

        const style = {
            zIndex: 5,
            textAlign: 'center',
            backgroundColor: 'white',
            width: w,
            height: h,
            display: 'flex'
        };

        const outlineStyle = {
            position: 'absolute',
            backgroundColor: 'black',
            width: w,
            height: h,
            zIndex: 4,
            opacity: this.state.clock / this.outlineDuration,
        };

        const imgProps = {
            style: {
                margin: 'auto',
                zIndex: 6,
                transform: this.state.mouseIn ? 'scale(0.97, 0.97)' : '',
                transition: 'all 0.3s'
            },
            src: this.props.src
        };

        const whiteStyle = {
            position: 'absolute',
            backgroundColor: 'white',
            width: w-2,
            height: h-2,
            marginLeft: '1px',
            marginTop: '1px',
            zIndex: 5,
            transform: this.state.mouseIn ? 'scale(0.97, 0.97)' : '',
            transition: 'all 0.3s'
        };

        return (
            <div ref={ this.divRef } style={ style } onMouseEnter={ this.mouseEnter.bind(this) } onMouseLeave={ this.mouseLeave.bind(this) }>
                <span style={ whiteStyle } />
                <img { ...imgProps } width={ this.props.imageWidth } height={ this.props.imageWidth } />
                <span style={ outlineStyle } />
            </div>
        );
    }
}
