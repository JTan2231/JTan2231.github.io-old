import React from 'react';
import { essays } from '../util/essays.js';
import { CommandLineInput } from './cmd_input.jsx';
import { TextHighlight } from './text_highlight.jsx';
import { TextDecode } from './text_decode.jsx';
import * as config from '../util/config.js';
import '../stylesheets/writings.css';

export class Works extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'displayChange': props.display,
            'inputChangingUp': false,
            'inputChangingDown': false,
            'inputFocusCount': 0
        };

        this.display = 'block';
        if (!props.display) {
            this.display = 'none';
        }

        this.canvasInterval = 30;

        this.small = props.small;
        this.searchFocused = false;

        this.paragraphs = '';//this.generateParagraphs("Home");

        this.essayDiv = React.createRef();
        this.errorDiv = React.createRef();
        this.cmdInput = React.createRef();
    }

    tick() {
        if (this.cmdInput !== undefined && this.cmdInput !== null) {
            if (this.cmdInput.current.state['queryReturn'] !== null) {
                this.displayEssay(this.cmdInput.current.state['queryReturn']);
            }
        }

        return;
    }
 
    componentDidMount() {
        this.mounted = true;
        if (this.mounted) {
            this.timerID = setInterval(
                () => this.tick(), this.canvasInterval
            );
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.displayChange !== prevProps.display) {
            if (!prevProps.display) {
                this.display = 'none';
                this.searchFocused = false;
            }
            else {
                this.display = 'block';
            }

            this.setState({ displayChange: prevProps.display });
        }
    }

    getFontSize() {
        if (this.small) {
            return '12px';
        }

        return '18px';
    }

    addLineBreaks(p, amount) {
        for (var i = 0; i < amount; i++) {
            p.push(<br/>);
        }

        return p;
    }

    generateParagraphs(essayName) {
        const essay = essays[essayName];
        var paragraphs = [];
        paragraphs.push(<h1>{ essayName }</h1>);

        if (essayName === 'library') {
            const highlightTexts = [
                'i expect most use cases to be around this size',
                'but if not,',
                `it shouldn't be a problem anyway`,
                'considering this was designed to handle all single lines',
                'long or short'
            ];

            paragraphs.push(<div><u>Text Highlighting:</u> Hover over a line</div>);
            for (const text of highlightTexts) {
                paragraphs.push(
                    <TextHighlight fontSize={ this.getFontSize() }
                                   totalWidth={ 0.4 * window.innerWidth }
                                   text={ text } />
                );
            }

            paragraphs.push(<br />);

            const decodeTexts = [
                'i refer to this effect as text decoding',
                'this is set up such that you can use',
                `different 'amounts' of decoding`,
                'e.g. this line has a lot of it going on',
                `while this line doesn't have quite as much`,
                'it can also use different types of encoding',
                'consider only symbols (not letters)',
                'or maybe only letters should be present',
                'perhaps you may even want both in your decoding'
            ];

            paragraphs.push(<div><u>Text Decoding:</u> Hover over a line</div>);
            for (const text of decodeTexts) {
                if (text[0] === 'e') {
                    paragraphs.push(<TextDecode text={ text } scrambleCount={ 10 } />);
                }
                else if (text[0] === 'w') {
                    paragraphs.push(<TextDecode text={ text } scrambleCount={ 1 } />);
                }
                else if (text[0] === 'c') {
                    paragraphs.push(<TextDecode text={ text } scrambleCount={ 6 } />);
                }
                else if (text[0] === 'o') {
                    paragraphs.push(<TextDecode text={ text } scrambleCount={ 6 } useLetters={ true } />);
                }
                else if (text[0] === 'p') {
                    paragraphs.push(<TextDecode text={ text } scrambleCount={ 6 } useBoth={ true }/>);
                }
                else {
                    paragraphs.push(<TextDecode text={ text } />);
                }
            }

            // other library elements ...

            return paragraphs;
        }

        for (var i = 0; i < essay.length; i++) {
            paragraphs.push(<p>{ essay[i] }</p>);
        }

        if (essayName === "home.txt") {
            paragraphs.push(<div style={{ 'textIndent': '0' }}>Contact me at <a href="mailto:j.tan2231@gmail.com">j.tan2231@gmail.com</a>.</div>);
            if (this.small) {
                paragraphs.push(<p>Visit this website on a desktop for a better experience.</p>);
            }
        }

        return paragraphs;
    }

    displayEssay(essayName) {
        this.paragraphs = this.generateParagraphs(essayName);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        this.setState({ displayChange: this.state.displayChange });
    }

    drawBackground() {
        var background = this.inputCanvas.current;
        var ctx = background.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, background.width, background.height);
    }

    processTitle(title) {
        const titleWords = title.split(' ');
        var newTitle = [];
        if (titleWords.length > 1) {
            for (const word of titleWords) {
                newTitle.push(word);
                newTitle.push(<br/>);
            }
        }
        else {
            newTitle = title;
        }

        return newTitle;
    }

    getTitleDivs() {
        var divs = [];
        for (const entry of Object.entries(essays)) {
            var title = entry[0];
            //const essayFunction = function (x) { this.displayEssay(x) };

            divs.push
            (
                <td style={{ 'width': '33%', 'textAlign': 'center' }}>
                    <div/* onClick={ () => essayFunction.bind(this)(title) }*/>
                        { this.processTitle(title) }
                    </div>
                </td>
            );
        }

        return divs;
    }

    render() {
        var left = '30%';
        var width = '40%';
        var cl = '0';
        var cw = '100%';
        var essayFontSize = '18px';
        if (this.small) {
            left = '0';
            width = '100%';

            cl = '10%';
            cw = '80%';
            essayFontSize = '12px';
        }

        const writingStyle = {
            'fontSize': '16px',
            'left': left,
            'top': '0%',
            'width': width,
            'height': '100%',
            'overflowX': 'hidden',
            'position': 'absolute',
            'cursor': 'default',
            'lineHeight': 2,
            'zIndex': 50
        };

        const childStyle = {
            'height': '100%',
            'position': 'absolute',
            'width': cw,
            'left': cl,
            'marginRight': '-50px',
            'paddingRight': '50px',
            'overflowY': 'scroll',
            'overflowX': 'hidden',
            'fontFamily': 'Courier New',
            'textIndent': '3.1em',
        };

        const essayStyle = {
            'fontSize': essayFontSize,
        };

        const titleStyle = {
            'fontFamily': 'Courier New',
            'width': '100%',
        };

        if (this.display === 'block' && !this.searchFocused && this.cmdInput.current && this.cmdInput.current.cmdInput.current) {
            setTimeout(function() {
                if (this.cmdInput.current && this.cmdInput.current.cmdInput.current) {
                    this.cmdInput.current.cmdInput.current.focus();
                    this.searchFocused = true;
                }
            }.bind(this), config.TRANSITION_DELAY_SECONDS * 1000 * 2)
        }

        return (
            <div style={{ 'display': this.display }}>
                <div style={ writingStyle }>
                    <div ref={ this.essayDiv } style={ childStyle }>
                        <table style={ titleStyle }>
                            <tr>
                                { this.getTitleDivs() }
                            </tr>
                        </table>
                        <div style={ essayStyle }>
                            <CommandLineInput ref={ this.cmdInput } search={ essays } />
                            { this.paragraphs }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
