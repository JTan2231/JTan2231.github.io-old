import React from 'react';
import * as config from '../util/config.js';

export class TextDecode extends React.Component {
    constructor(props) {
        super(props);

        this.text = props.text;
        this.scrambleCount = props.scrambleCount ? props.scrambleCount : 3;
        this.useLetters = props.useLetters ? props.useLetters : false;
        this.useBoth = props.useBoth ? props.useBoth : false;

        this.randomSymbolList = ' !@#$%^&*()~`-_=+[{]}\\|\'";:.>/?,<1234567890'.split('');
        this.randomLetterList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        this.allRandomList = this.randomSymbolList.concat(this.randomLetterList);

        this.state = {
            renderedText: this.text,
            indices: [],
        };
    }

    componentDidMount() {
        this.mounted = true;
        if (this.mounted) {
            this.timerID = setInterval(
                () => this.tick(), config.INTERVAL*4
            );
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.cont !== prevProps.cont) {
            this.setState({ cont: prevProps.cont });
        }
    }

    mouseEnter(e) {
        // start the decoding ...
        if (this.state.indices.length === 0) {
            this.setState({ indices: this.range(this.scrambleCount) });
        }
    }

    // returns a list of [0, number]
    range(number) {
        var out = [];
        for (var i = 0; i <= number; i++) {
            out.push(i);
        }

        return out;
    }

    incrementList(list) {
        var out = [];
        for (const i of list) {
            out.push(i+1);
        }

        return out;
    }

    sampleList() {
        if (this.useBoth) {
            return this.allRandomList[Math.floor(Math.random() * this.allRandomList.length)];
        }
        else if (this.useLetters) {
            return this.randomLetterList[Math.floor(Math.random() * this.randomLetterList.length)];
        }
        else {
            return this.randomSymbolList[Math.floor(Math.random() * this.randomSymbolList.length)];
        }
    }

    tick() {
        if (this.state.indices.length > 0) {
            const decipheredText = this.text.substring(0, this.state.indices[0]);
            var renderedText = decipheredText + '';
            var limitCount = 0;
            for (const index of this.state.indices) {
                if (index  >= this.text.length) {
                    limitCount++;
                    if (limitCount === this.state.indices.length) {
                        this.setState({ indices: [], renderedText: this.text });
                        return;
                    }
                }
                else {
                    renderedText += this.sampleList();
                }
            }

            this.setState({ renderedText: renderedText, indices: this.incrementList(this.state.indices) });
        }
    }

    render() {
        return (
            <div onMouseEnter={ this.mouseEnter.bind(this) }>
                { this.state.renderedText }
            </div>
        );
    }
}
