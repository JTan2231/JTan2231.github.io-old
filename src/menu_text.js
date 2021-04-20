import React from 'react';
import * as config from './config.js';

export class MenuText extends React.Component {
    constructor(props) {
        super(props);

        this.frequency = 1;

        this.mounted = false;
        this.underscoreInterval = config.UNDERSCORE_INTERVAL;

        this.url = props.url;

        var style = { 'useless': null };

        for (const [key, value] of Object.entries(props.style))
            style[key] = value;

        style['top'] = (props.number-0.5)*config.MENU_CONTENT_HEIGHT;

        this.state = {
            hovered: false,
            clock: 1,
            text: props.text,
            style: style
        };
    }

    componentDidMount() {
        this.mounted = true;
        if (this.mounted) {
            this.timerID = setInterval(
                () => this.tick(), this.frequency
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

    tick() {
        var text = this.state.text, clock = this.state.clock + 1;
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
        var text = this.updateText();
        this.setState({
            hovered: true,
            text: text,
            clock: 1
        });
    }

    mouseLeave(e) {
        var text = this.state.text;
        if (text[text.length-1] === '_')
            text = text.substring(0, text.length-1);

        this.setState({
            hovered: false,
            text: text,
            clock: 1
        });
    }

    render() {
        return (
            <a href={ this.url }>
                <div style={ this.state.style }
                     onMouseEnter={ this.mouseEnter.bind(this) }
                     onMouseLeave={ this.mouseLeave.bind(this) }>{ this.state.text }</div>
            </a>
        );
    }
}
