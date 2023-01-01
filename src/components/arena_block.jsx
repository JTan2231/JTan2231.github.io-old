import React from 'react';
import * as vec2d from '../util/vec2d.js';
import * as config from '../util/config.js';

export class ArenaBlock extends React.Component {
    constructor(props) {
        super(props);

        this.outlineDuration = 60;
        this.fontSize = 18;

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
        const s = 15;
        const w = s;
        const h = s;

        const duration = '0.1s';
        const scale = 0.98;

        const style = {
            zIndex: 5,
            textAlign: 'center',
            backgroundColor: 'white',
            width: `${w}em`,
            height: `${h}em`,
            display: 'flex',
            overflow: 'hidden',
            margin: '1em',
        };

        const outlineStyle = {
            position: 'absolute',
            backgroundColor: 'black',
            width: `${w}em`,
            height: `${h}em`,
            zIndex: 4,
            opacity: this.state.clock / this.outlineDuration,
        };

        const imgProps = {
            style: {
                margin: 'auto',
                zIndex: 6,
                transform: this.state.mouseIn ? `scale(${scale}, ${scale})` : '',
                transition: `all ${duration}`,
            },
            src: this.props.src
        };

        const whiteStyle = {
            position: 'absolute',
            backgroundColor: 'white',
            width: `calc(${w}em - 2px)`,
            height: `calc(${h}em - 2px)`,
            marginLeft: '1px',
            marginTop: '1px',
            zIndex: 5,
            transform: this.state.mouseIn ? `scale(${scale}, ${scale})` : '',
            transition: `all ${duration}`,
        };

        const textStyle = {
            margin: `${s * 0.05}em`,
            zIndex: 6,
            transform: this.state.mouseIn ? `scale(${scale}, ${scale})` : '',
            transition: `all ${duration}`,
            color: 'black',
            overflow: 'hidden',
            fontSize: this.fontSize,
            fontFamily: config.FONT_FAMILY,
            lineHeight: '1.5em',
        };

        return (
            <div ref={ this.divRef } style={ style } onMouseEnter={ this.mouseEnter.bind(this) } onMouseLeave={ this.mouseLeave.bind(this) }>
                <span style={ whiteStyle } />
                <span style={ textStyle } dangerouslySetInnerHTML={{ __html: this.props.elementString }} />
                <span style={ outlineStyle } />
            </div>
        );
    }
}
