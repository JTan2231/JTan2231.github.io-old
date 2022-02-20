import React from 'react';
import * as config from './config.js';

export class MenuText extends React.Component {
    constructor(props) {
        super(props);

        this.frequency = 1;

        this.build_frequency = 6;

        this.mounted = false;
        this.underscoreInterval = config.UNDERSCORE_INTERVAL;

        this.url = props.url;
        this.title = props.text;

        var style = { 'useless': null };

        for (const [key, value] of Object.entries(props.style))
            style[key] = value;

        var menuContentHeight = config.MENU_CONTENT_HEIGHT_SCALAR * window.innerHeight;
        style['top'] = (props.number-0.5) * menuContentHeight;//config.MENU_CONTENT_HEIGHT;

        this.state = {
            hovered: false,
            built: false,
            build_index: 0,
            clock: 1,
            text: '',
            style: style
        };
    }

    componentDidMount() {
        this.mounted = true;
        if (this.mounted) {
            this.timerID = setInterval(
                () => this.tick(), config.INTERVAL
            );
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    updateText() {
        var text = this.state.text;
        if (text.slice(text.length-1) === '_')
            text = text.substring(0, text.length-1);
        else
            text += '_';

        return text
    }

    buildText() {
        var text = this.state.text;
        var idx = this.state.build_index;

        if (text === this.title) {
            this.setState({ built: true, clock: 1 });
            return;
        }

        text += this.title[idx];
        idx++;
        this.setState({
            text: text,
            build_index: idx,
            clock: 1
        });
    }

    tick() {
        var text = this.state.text, clock = this.state.clock + 1;
        if (!this.state.built && clock - this.build_frequency === 0) {
            this.buildText();
            return;
        }

        if (this.state.hovered && this.state.clock % this.underscoreInterval === 0) {
            text = this.updateText();
            clock = 1;
        }

        this.setState({
            text: text,
            clock: clock
        });
    }

    mouseEnter(e) {
        if (this.state.built) {
            var text = this.updateText();
            this.setState({
                hovered: true,
                text: text,
                clock: 1
            });
        }
    }

    mouseLeave(e) {
        if (this.state.built) {
            var text = this.state.text;
            if (text[text.length-1] === '_')
                text = text.substring(0, text.length-1);

            this.setState({
                hovered: false,
                text: text,
                clock: 1
            });
        }
    }

    render() {
        if (this.url.length === 0) {
            return (
                <a>
                    <div style={ this.state.style }
                         onMouseEnter={ this.mouseEnter.bind(this) }
                         onMouseLeave={ this.mouseLeave.bind(this) }>{ this.state.text }</div>
                </a>
            );
        }

        return (
            <a href={ this.url }>
                <div style={ this.state.style }
                     onMouseEnter={ this.mouseEnter.bind(this) }
                     onMouseLeave={ this.mouseLeave.bind(this) }>{ this.state.text }</div>
            </a>
        );
    }
}
