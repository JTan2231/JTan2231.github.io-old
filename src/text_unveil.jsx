import React from 'react';
import * as config from './config.js';
import { MenuText } from './menu_text.js';
import { styles } from './menu_styles.js';

export class Transition extends React.Component {
    constructor(props) {
        super(props);

        if (props.width !== undefined)
            this.width = props.width;
        else
            this.width = '100%';

        if (props.height !== undefined)
            this.height = props.height;
        else
            this.height = '100%';

        this.state = {
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        /*if (this.state.cont !== prevProps.cont) {
            this.setState({ cont: prevProps.cont });
        }*/
    }

    draw() {
        

    onClick(e) { 
        this.setState({ moving: true });
    }

    tick() {
        // do something
    }

    render() {
        return (
            <div>
                <span>some text</span>
                <canvas style={ styles.backgroundStyle } ref={ this.backgroundCanvas } width={ this.canvasWidth } height={ this.height } />
            </div>
        );
    }
}
