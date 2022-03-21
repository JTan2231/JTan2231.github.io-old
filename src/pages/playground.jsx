import React from 'react';
import * as mathUtils from '../util/math_utils.js';
import * as config from '../util/config.js';
import { ArenaBlock } from '../components/arena_block.jsx';
import { TextHighlight } from '../components/text_highlight.jsx';

export class Playground extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
        };
    }

    componentDidMount() {
        Promise.all([
            fetch("https://api.are.na/v2/channels/shapes-ffvhm1vi9ls?per=100").then(res => res.json()),
            fetch("https://api.are.na/v2/channels/people-s-thoughts?per=100").then(res => res.json()),
        ]).then((results) => {
            console.log(results);
            const shapes = results[0];
            const thoughts = results[1];

            var content = {
                shapes: {
                    images: [],
                    ids: [],
                },
                thoughts: {
                    images: [],
                    texts: [],
                    ids: [],
                }
            };

            var images = [];
            var texts = [];

            for (const im of shapes.contents) {
                if (im.image) {
                    content.shapes.images.push(im.image.display.url);
                    content.shapes.ids.push(im.id);
                }
            }

            for (const im of thoughts.contents) {
                if (im.image) {
                    content.thoughts.images.push(im.image.display.url);
                }
                else if (im.content && im.content.length > 0) {
                    content.thoughts.texts.push(im.content);
                }

                content.thoughts.ids.push(im.id);
            }

            var t = false;
            var displayContent = [];
            for (var i = 0; i < Math.min(content.shapes.images.length, content.thoughts.images.length + content.thoughts.texts.length); i++) {
                displayContent.push({ image: content.shapes.images[i] });

                if (t) {
                    displayContent.push({ text: content.thoughts.texts[i] });
                }
                else {
                    displayContent.push({ image: content.thoughts.images[i] });
                }

                t = !t;
            }

            this.setState({
                isLoaded: true,
                content: displayContent,
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
            for (const cont of this.state.content) {
                var text;
                if (cont.text && cont.text.split(' ').length > 50) {
                    text = cont.text.split(' ').slice(0, 50).join(' ') + ' ...';
                }

                arenaBlocks.push(
                    <a style={{ textDecoration: 'none' }} href={ 'https://www.are.na/block/'+cont.id } target="_blank">
                        <ArenaBlock src={ cont.image } elementString={ text } imageWidth={ dims } imageHeight={ dims } margin={ 50 } />
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
