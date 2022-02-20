import React from 'react';
import * as config from './config.js';
import { styles } from './menu_styles.js';
import { essays } from './test_text.js';

export class Writings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'displayChange': props.display,
        };

        this.display = 'block';
        if (!props.display) {
            this.display = 'none';
        }

        this.small = props.small;

        this.paragraphs = this.generateParagraphs("Home");
        this.essayDiv = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.displayChange !== prevProps.display) {
            if (!prevProps.display) {
                this.display = 'none';
            }
            else {
                this.display = 'block';
            }

            this.setState({ displayChange: prevProps.display });
        }
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
        //paragraphs = this.addLineBreaks(paragraphs, 1);
        paragraphs.push(<h1>{ essayName }</h1>);
        //paragraphs = this.addLineBreaks(paragraphs, 1);

        for (var i = 0; i < essay.length; i++) {
            paragraphs.push(<p>{ essay[i] }</p>);
        }

        if (essayName === "Home" && this.small) {
            paragraphs.push(<p>Visit this website on a desktop for a better experience.</p>);
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
        for (const [title, essay] of Object.entries(essays)) {
            const essayFunction = function (x) { this.displayEssay(x) };

            divs.push
            (
                <td style={{ 'width': '33%', 'textAlign': 'center' }}>
                    <div onClick={ () => essayFunction.bind(this)(title) }>
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
            'fontFamily': 'Courier New',
            'textIndent': '50px',
        };

        const essayStyle = {
            'fontSize': essayFontSize,
        };

        const titleStyle = {
            'fontFamily': 'Courier New',
            'width': '100%',
        };

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
                            { this.paragraphs }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
