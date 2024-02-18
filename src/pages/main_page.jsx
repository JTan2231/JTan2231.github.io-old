import React from 'react';
import * as config from '../util/config.js';
import { Portfolio } from './portfolio.jsx';

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
        const w = 40;
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

        return (
            <div>
                <div style={aboutStyle} className="about">
                    <div style={headerStyle} className="header">
                        Joey Tan
                    </div>
                    <div>
                        <span>Software developer.</span><br />I like wringing the simplicity out of complexity.
                        <br />
                        <br />
                        <div className="aboutBody">
                            Currently working on:
                            <div style={{ margin: '0 0 0.5em 0', }}>
                                <div>
                                    <a href="https://youtu.be/enJ6be4qLMs" target="_blank" rel="noreferrer">
                                        Scherzo No. 2
                                    </a>
                                    &nbsp;- Learning my favorite Chopin piece
                                </div>
                                <div>
                                    <a href="https://github.com/jtan2231/hivemind" target="_blank" rel="noreferrer">
                                        Hive
                                    </a>
                                    &nbsp;- Tensor processing language and autodiff exploration
                                </div>
                                <div>
                                    <a href="https://github.com/JTan2231/eidetic" target="_blank" rel="noreferrer">
                                        Eidetic
                                    </a>
                                    &nbsp;- Looking for a better interface between GPT and ideas
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="aboutLink">
                            <a href="https://linkedin.com/in/joseph-tan-478aa5186" target="_blank" rel="noreferrer">LinkedIn</a>&nbsp;<a href="https://github.com/JTan2231/" target="_blank" rel="noreferrer">GitHub</a>&nbsp;<a href="https://www.are.na/joey-tan" target="_blank" rel="noreferrer">Are.na</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
