import React from 'react';
import * as vec2d from '../util/vec2d.js';
import * as config from '../util/config.js';

export class Floaty extends React.Component {
    constructor(props) {
        super(props);

        if (!props.width || !props.height) {
            this.width = 320;
            this.height = 160;
        }
        else {
            this.width = props.width;
            this.height = props.height;
        }

        var proot = props.root;
        var rx = proot[0];
        var ry = proot[1];

        if ((rx + '').includes('%')) {
            rx = window.innerWidth * parseFloat(rx.substring(0, rx.length-1)) / 100;
        }

        if ((ry + '').includes('%')) {
            ry = window.innerWidth * parseFloat(ry.substring(0, ry.length-1)) / 100;
        }

        this.radius = props.radius;
        this.proot = new vec2d.Vector2D([rx, ry]);
        this.root = new vec2d.Vector2D([rx+(this.width/2), ry+(this.height/2)]);
        this.elements = props.elements;
        this.lambda = 0.005;

        this.start = [0, 0];

        this.state = {
            currentPosition: [0, 0],
            transform: 'translate(0%, 0%)',
            mouseIn: false,
        };

        this.mouse = {
            x: -1000,
            y: -1000
        };

        this.divRef = React.createRef();
    }

    componentDidMount() {
        this.mounted = true;
        this.timerID = setInterval(
            () => this.tick(), config.INTERVAL
        );

        this.setState({ currentPosition: [this.root.x, this.root.y] });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.highlightMouseIn !== undefined && prevProps.highlightMouseIn !== this.state.filler) {
            this.setState({ filler: prevProps.highlightMouseIn });
        }
    }

    mouseEnter(e) {
        this.setState({ mouseIn: true });
    }

    mouseMove(e) {
        this.setState({ mouseX: e.clientX, mouseY: e.clientY });
    }

    mouseLeave(e) {
        this.setState({ mouseIn: false });
    }

    updatePosition(targetRoot, receding) {
        var translatedCenter = targetRoot;

        var current = new vec2d.Vector2D(this.state.currentPosition);
        var travelVec = vec2d.subVec2D(translatedCenter, current);
        var updateVec = vec2d.normalizeVec2DOut(travelVec);
        var m = travelVec.magnitude() * this.lambda;

        if (m === 0) {
            return;
        }

        if (receding) {
            m *= 5;
        }

        updateVec = vec2d.scalarMultVec2D(m*m, updateVec); // from gravity equation; assuming m1 == m2 == 1, no G, and r^2 instead of r^-2
        current = vec2d.addVec2D(current, updateVec);

        var translationVec = vec2d.subVec2D(current, this.root);
        if (translationVec.magnitude() > this.radius) {
            translationVec = vec2d.normalizeVec2DOut(translationVec);
            translationVec = vec2d.scalarMultVec2D(this.radius, translationVec);
        }

        if (receding) {
            if (translationVec.magnitude() < 1) {
                translationVec.x = 0;
                translationVec.y = 0;
                current = this.root;
            }
        }

        this.setState({ currentPosition: [current.x, current.y], transform: 'translate('+translationVec.x+'px, '+translationVec.y+'px)' });
    }

    tick() {
        if (this.mounted) {
            if (this.state.mouseIn) {
                this.updatePosition(new vec2d.Vector2D([this.state.mouseX, this.state.mouseY]), false);
            }
            else {
                this.updatePosition(this.root, true);
            }
        }
    }

    render() {
        const style = {
            'zIndex': 500,
            'textAlign': 'center',
            'width': this.width,
            'height': this.height,
            'left': this.proot.x,
            'top': this.proot.y,
            'position': 'absolute',
            'transform': this.state.transform,
            'border': '1px solid black',
            'backgroundColor': 'white'
        };

        return (
            <div ref={ this.divRef } style={ style }
                 onMouseEnter={ this.mouseEnter.bind(this) }
                 onMouseLeave={ this.mouseLeave.bind(this) }
                 onMouseMove={ this.mouseMove.bind(this) }>
                <div>{ this.elements }</div>
            </div>
        );
    }
}
