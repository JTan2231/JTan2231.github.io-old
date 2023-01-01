import React from 'react';
import * as mathUtils from '../util/math_utils.js';
import * as config from '../util/config.js';
import { ArenaBlock } from '../components/arena_block.jsx';
import { TextHighlight } from '../components/text_highlight.jsx';
import { clusteredBlocks } from '../util/blocks.js';

export class Playground extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const clusterStyle = {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '10em',
            border: '1px solid black',
            backgroundColor: 'transparent',
            padding: '3em',
        };

        let clusters = [];
        for (const cluster of clusteredBlocks) {
            let arenaBlocks = [];
            for (const block of cluster) {
                let text = block[0];
                let id = block[1];

                if (text.split(' ').length > 50) {
                    text = text.split(' ').slice(0, 50).join(' ') + ' ...';
                }

                arenaBlocks.push(
                    <a style={{ textDecoration: 'none' }} href={ `https://www.are.na/block/${id}` } target="_blank">
                        <ArenaBlock elementString={ text } />
                    </a>
                );
            }

            clusters.push(
                <div style={ clusterStyle }>
                    { arenaBlocks }
                </div>
            );
        }

        return (
            <div>
                { clusters }
            </div>
        );
    }
}
