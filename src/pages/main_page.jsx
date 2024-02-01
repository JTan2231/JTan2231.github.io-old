import React from 'react';
import * as config from '../util/config.js';
import { Portfolio } from './portfolio.jsx';
import { TextHighlight } from '../components/text_highlight.jsx';

import '../stylesheets/main_page.css';
import '../stylesheets/about.css';

export class MainMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            portfolio: true,
            whatIsThis: false,
        };
    }

    portfolioClick() {
        this.setState({
            portfolio: !this.state.portfolio,
            whatIsThis: false,
        });
    }

    whatIsThisClick() {
        this.setState({ whatIsThis: !this.state.whatIsThis });
    }

    render() {
        const buttonStyle = {
            position: 'fixed',
            left: '5px',
            top: '5px',
            zIndex: 100,
            cursor: 'default',
            fontFamily: config.FONT_FAMILY,
            fontSize: '10px'
        };

        var div;
        if (this.state.portfolio) {
            div = (
                <div style={buttonStyle} onClick={this.portfolioClick.bind(this)}>
                    <TextHighlight text="are.na" duration={0.3} />
                </div>
            );
        }
        else {
            div = (
                <div style={buttonStyle}>
                    <span onClick={this.portfolioClick.bind(this)}>
                        <TextHighlight text="portfolio" duration={0.3} />
                    </span>
                    <br />
                    <span onClick={this.whatIsThisClick.bind(this)}>
                        <TextHighlight text="what is this?" duration={0.3} />
                    </span>
                </div>
            );
        }

        const playgroundStyle = {
            position: 'absolute',
            overflow: 'scroll',
            top: '30px',
            zIndex: 4,
            width: 'calc(100vw - 10em)',
            margin: '0 5em',
            display: this.state.portfolio ? 'none' : '',
        }

        const w = 40;
        const h = 50;
        const aboutStyle = {
            width: `${w}vw`,
            height: `fit-content`,
            position: 'fixed',
            left: `calc(50vw - ${w / 2}vw)`,
            top: `calc(25vh)`,
            fontFamily: config.FONT_FAMILY,
            fontSize: '20px',
            lineHeight: '1.5em',
            padding: '1.5em',
            display: this.state.portfolio ? '' : 'none',
            zIndex: 10,
        };

        const headerStyle = {
            fontSize: '32px',
            fontWeight: 'bolder',
            marginBottom: '0.5em',
        };

        const whatIsThisStyle = Object.assign({}, aboutStyle, {
            display: this.state.whatIsThis ? '' : 'none',
            backgroundColor: 'white',
        });

        return (
            <div>
                <Portfolio />
                <div style={aboutStyle} className="about">
                    <div style={headerStyle} className="header">
                        Joey Tan
                    </div>
                    <div>
                        Software developer. I like building things.
                        <br />
                        <div className="aboutBody">
                            Currently working on:
                            <ul style={{ margin: '0 0 0.5em 0', }}>
                                <li>
                                    <a href="https://youtu.be/KCSEwfqs-VM" target="_blank" rel="noreferrer">
                                        Chopin's Polonaise in A-flat major, Op. 53
                                    </a>
                                    &nbsp;- My favorite Chopin piece
                                </li>
                                <li>
                                    <a href="https://github.com/jtan2231/hivemind/" target="_blank" rel="noreferrer">
                                        Hive
                                    </a>
                                    &nbsp;- Tensor processing language and autodiff exploration
                                </li>
                                <li>
                                    <a href="https://leetcode.com/JTan2231/" target="_blank" rel="noreferrer">
                                        LeetCode
                                    </a>
                                    &nbsp;- Algorithmic proficiency
                                </li>
                            </ul>
                        </div>
                        <div className="aboutLink">
                            Find me on <a href="https://linkedin.com/in/joseph-tan-478aa5186" target="_blank" rel="noreferrer">LinkedIn</a>, <a href="https://github.com/JTan2231/" target="_blank" rel="noreferrer">GitHub</a>, <a href="https://www.are.na/joey-tan" target="_blank" rel="noreferrer">are.na</a>, or email me at <a href="mailto:jtan2231@gmail.com">j.tan2231@gmail.com</a>.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
