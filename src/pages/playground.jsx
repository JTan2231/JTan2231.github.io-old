import React from 'react';
import * as mathUtils from '../util/math_utils.js';
import * as config from '../util/config.js';
import { ArenaBlock } from '../components/arena_block.jsx';

export class Playground extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
        };
    }

    componentDidMount() {
        fetch("https://api.are.na/v2/channels/shapes-ffvhm1vi9ls?per=50").then(res => res.json()).then((result) => {
            var images = [];
            var channels = [];
            var ids = [];

            for (const im of result.contents) {
                if (im.image) {
                    images.push(im.image.display.url);
                    ids.push(im.id);
                }
                else {
                    channels.push(im.title);
                }
            }

            this.setState({
                isLoaded: true,
                images: images,
                channels: channels,
                ids: ids
            });
        },
        (error) => {
            this.setState({
                isLoaded: false,
            });
        });
    }

    render() {
        if (this.state.isLoaded) {
            var arenaBlocks = [];
            const dims = window.innerWidth / 10;
            for (var i = 0; i < this.state.images.length; i++) {
                arenaBlocks.push(
                    <a href={ 'https://www.are.na/block/'+this.state.ids[i] } target="_blank">
                        <ArenaBlock src={ this.state.images[i] } imageWidth={ dims } imageHeight={ dims } margin={ 50 } />
                    </a>
                );
            }

            return (
                <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        { arenaBlocks }
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    nothing yet
                </div>
            );
        }
    }
}
