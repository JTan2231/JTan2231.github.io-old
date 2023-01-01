import React from 'react';
import '../stylesheets/writings.css';

export class CommandLineInput extends React.Component {
    constructor(props) {
        super(props);

        this.canvasMin = 1

        this.state = {
            'inputValue': '',
            'inputChangingUp': false,
            'inputChangingDown': false,
            'inputFocusCount': this.canvasMin,
            'queryReturn': null
        };

        this.canvasInterval = 30;

        this.bin = props.search;

        this.small = props.small;

        this.cmdInput = React.createRef();
        this.inputCanvas = React.createRef();
        this.errorDiv = React.createRef();
    }

    tick() {
        const inputCanvas = this.inputCanvas.current;
        var x;
        if (this.state['inputChangingUp'] && this.inputCanvas) {
            const ctx = inputCanvas.getContext('2d');

            ctx.clearRect(0, 0, inputCanvas.width, inputCanvas.height);
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, inputCanvas.width, this.state['inputFocusCount']);

            x = this.state['inputChangingUp'] ? this.state['inputFocusCount'] !== inputCanvas.height : !this.state.['inputChangingUp'];

            this.setState({
                'inputChangingUp': x,
                'inputFocusCount': this.state['inputFocusCount'] + 1
            });
        }
        else if (this.state['inputChangingDown'] && this.inputCanvas) {
            const ctx = inputCanvas.getContext('2d');

            ctx.clearRect(0, 0, inputCanvas.width, inputCanvas.height);
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, inputCanvas.width, this.state['inputFocusCount']);

            x = this.state['inputChangingDown'] ? this.state['inputFocusCount'] !== this.canvasMin : !this.state.['inputChangingDown'];

            this.setState({
                'inputChangingDown': x,
                'inputFocusCount': this.state['inputFocusCount'] - 1
            });
        }
    }
 
    componentDidMount() {
        this.mounted = true;
        if (this.mounted) {
            this.timerID = setInterval(
                () => this.tick(), this.canvasInterval
            );
        }

        const inputCanvas = this.inputCanvas.current;
        const ctx = inputCanvas.getContext('2d');

        ctx.clearRect(0, 0, inputCanvas.width, inputCanvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, inputCanvas.width, this.canvasMin);
    }

    parseInput(e) {
        if (e.key === 'Enter') {
            if (this.cmdInput.current.placeholder.length > 0) {
                this.cmdInput.current.placeholder = '';
            }

            var inputValue = this.cmdInput.current.value.split(' ');
            var command = inputValue.slice(0, 1)[0];
            var args = inputValue.slice(1);

            if (command !== 'open' || args.length > 1) {
                this.setState({ 'queryReturn': null });
                this.errorDiv.current.textContent = 'usage: open <filename>';
            }
            else {
                var queryName = args[0];
                if (this.bin.hasOwnProperty(queryName)) {
                    this.setState({ 'queryReturn': queryName });
                    this.errorDiv.current.textContent = '';
                }
                else {
                    this.setState({ 'queryReturn': null });
                    this.errorDiv.current.textContent = 'invalid filename';
                }
            }

            this.cmdInput.current.value = '';
        }
    }

    onCmdFocus(e) {
        this.setState({
            'inputChangingUp': true,
            'inputChangingDown': false,
            'inputFocusCount': this.canvasMin
        });
    }

    onCmdFocusOut(e) {
        const inputCanvas = this.inputCanvas.current;
        this.setState({
            'inputChangingUp': false,
            'inputChangingDown': true,
            'inputFocusCount': inputCanvas.height
        });
    }

    render() {
        const inputStyle = {
            'border': 0,
            'outlineWidth': 0,
            'width': '90%',
        };

        return (
            <div>
                <div style={{ 'marginBottom': '-22px',  }}>
                    <input style={ inputStyle } type="text" maxlength="30"
                           placeholder="open home.txt"
                           onFocus={ this.onCmdFocus.bind(this) }
                           onBlur={ this.onCmdFocusOut.bind(this) }
                           onKeyDown={ this.parseInput.bind(this) }
                           ref={ this.cmdInput } />
                </div>
                <canvas style={{ 'width': '90%', 'height': '5px', 'left': '7%', 'position': 'relative' }} ref={ this.inputCanvas } width="100%" height="5px" />
                <div style={{ 'color': 'red', 'fontSize': '12px' }} ref={ this.errorDiv }></div>
            </div>
        );
    }
}
