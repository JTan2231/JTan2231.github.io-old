import React from 'react';
import * as config from '../util/config.js';
import { Portfolio } from './portfolio.jsx';
import { Playground } from './playground.jsx';
import { TextHighlight } from '../components/text_highlight.jsx';

import '../stylesheets/main_page.css';

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
                <div style={ buttonStyle } onClick={ this.portfolioClick.bind(this) }>
                    <TextHighlight text="are.na" duration={ 0.3 } />
                </div>
            );
        }
        else {
            div = (
                <div style={ buttonStyle }>
                    <span onClick={ this.portfolioClick.bind(this) }>
                        <TextHighlight text="portfolio" duration={ 0.3 } />
                    </span>
                    <br />
                    <span onClick={ this.whatIsThisClick.bind(this) }>
                        <TextHighlight text="what is this?" duration={ 0.3 } />
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
            left: `calc(50vw - ${w/2}vw)`,
            top: `calc(10vh)`,
            backgroundColor: 'white',
            border: '1px solid black',
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

        return (
            <div>
                { div }
                <div style={ playgroundStyle }>
                    <Playground />
                    <div style={ Object.assign({}, aboutStyle, { display: this.state.whatIsThis ? '' : 'none' }) }>
                        <div style={ headerStyle }>
                            What is this?
                        </div>
                        A collection of <a href="https://www.are.na/" target="_blank" rel="noreferrer">Are.na</a> blocks clustered by the contextual similarity of their contents using machine learning.
                        <br />
                        This was done using:
                        <ul style={{ marginBottom: '2em' }}>
                            <li><a href="https://dl.acm.org/doi/pdf/10.1145/3397271.3401075" target="_blank" rel="noreferrer">ColBERT</a>, a natural language processing neural network</li>
                            <li>The following Are.na channels:
                                <ul>
                                    <li><a target="_blank" rel="noreferrer" href="https://are.na/alex-tan/the-start-of-an-idea">The Start of an Idea</a></li>
                                    <li><a target="_blank" rel="noreferrer" href="https://are.na/joey-tan/people-s-thoughts">People's Thoughts</a></li>
                                    <li><a target="_blank" rel="noreferrer" href="https://www.are.na/n-s-y_gxgqkwv54/notes-and-moments">Notes and Moments</a></li>
                                </ul>
                            </li>
                        </ul>

                        <div style={{ cursor: 'pointer', fontWeight: 'bolder', }} onClick={ this.whatIsThisClick.bind(this) }>
                            Close
                        </div>
                    </div>
                </div>
                <Portfolio />
                <div style={ aboutStyle }>
                    <div style={ headerStyle }>
                        Joey Tan
                    </div>
                    <div>
                        Computer science student (May 2023) interested in making tomorrow easier.
                        <br />
                        Currently:
                        <ul style={{ margin: '0 0 0.5em 0', }}>
                            <li>Experienced/comfortable with:
                                <ul>
                                    <li>Full stack web development</li>
                                    <li>Data science/machine learning</li>
                                </ul>
                            </li>
                            <li>Interested in/willing to learn:
                                <ul>
                                    <li>Embedded development</li>
                                    <li>Scientific computing</li>
                                </ul>
                            </li>
                            <li>Working on <a href="https://joeytan.dev/" target="_blank" rel="noreferrer">Eidetic</a></li>
                            <li>Reading:
                                <ul>
                                    <li>
                                        <a href="https://www.amazon.com/Ancient-Greek-Athletics-Stephen-Miller/dp/0300115296" target="_blank" rel="noreferrer">
                                            Ancient Greek Athletics
                                        </a> by Stephen Miller
                                    </li>
                                    <li>
                                        <a href="https://thenetworkstate.com/" target="_blank" rel="noreferrer">The Network State</a> by Balaji Srinivasan
                                    </li>
                                </ul>
                            </li>
                            <li>Learning how to skate like <a href="https://youtu.be/HI1ZlEdWWJg" target="_blank" rel="noreferrer">this</a></li>
                        </ul>
                        Read my <a href="https://drive.google.com/file/d/1WbvTtYuqnQ-GS1HM6Igf9gv8s9o2e6kz/view?usp=sharing" target="_blank" rel="noreferrer">CV</a>, find me on <a href="https://linkedin.com/in/joseph-tan-478aa5186" target="_blank" rel="noreferrer">LinkedIn</a> and <a href="https://github.com/JTan2231/" target="_blank" rel="noreferrer">GitHub</a>, or reach me at <a href="mailto:jtan2231@gmail.com">j.tan2231@gmail.com</a>.
                    </div>
                </div>
            </div>
        );
    }
}
