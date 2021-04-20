import React from 'react';
import * as vec2d from './vec2d.js';
import * as mathUtils from './math_utils.js';
import * as config from './config.js';
import { backgroundText } from './background_text.js';
import { MenuText } from './menu_text.js';

// see https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional_collision_with_two_moving_objects
function elasticCollision2D(x1, x2, v1, v2, m1, m2) {
    var dv = vec2d.subVec2D(v1, v2);
    var dx = vec2d.subVec2D(x1, x2);

    var dxMag = dx.magnitude();

    var total = vec2d.vecDot2D(dv, dx) / (dxMag*dxMag);
    total *= (2*m2 / (m1+m2));

    total = vec2d.scalarMultVec2D(total, dx);
    total = vec2d.subVec2D(v1, total);
    total = vec2d.scalarMultVec2D(1.1, total);
    total = vec2d.threshold(total);

    return total;
}

class Circle {
    constructor(position, radius=config.RADIUS_DEFAULT) {
        this.radius = radius;
        this.mass = radius;
        this.position = new vec2d.Vector2D(position);
        this.velocity = new vec2d.Vector2D([0, 0]);
    }

    // Check for a collision with a circle c
    // Perfectly elastic collisions are assumed
    checkCollision(c) {
        if (vec2d.eucDistance(this.position, c.position) < this.radius+c.radius)
            return true;

        return false;
    }
}

function forceOut(x1, x2, r1, r2) {
    // Normalized vector in direction of c2
    var d = vec2d.subVec2D(x1, x2);
    d.normalize();

    var distance = vec2d.eucDistance(x1, x2);
    // Vector covering the distance between c1 and c2
    // in the direction of c2
    var D = vec2d.scalarMultVec2D(distance, d);
    var R1 = vec2d.scalarMultVec2D(r1, d);
    var R2 = vec2d.scalarMultVec2D(r2, d);

    var dR1 = vec2d.subVec2D(D, R1);
    var dR2 = vec2d.subVec2D(D, R2);

    // (dR1 + dR2(.magnitude() > D.magnitude()
    var overlap = vec2d.subVec2D(vec2d.addVec2D(dR1, dR2), D);

    var p2 = vec2d.addVec2D(x2, overlap);
    var p1 = vec2d.addVec2D(x1, vec2d.scalarMultVec2D(-1, overlap));

    return [p1, p2];
}

class PhysicsMenu extends React.Component {
    constructor(props) {
        super(props);

        this.width = 0;
        this.height = 0;
        this.canvas_width = 0;
        this.left_offset = 0;

        this.state = {
            count: 0,
            clock: 0,
            backgroundDrawn: false
        };

        this.mouse = {
            x: -1000,
            y: -1000
        };
        this.circles = [];
        this.collisions = [];
    }

    componentDidMount() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.canvasWidth = this.width * config.TEXT_RATIO;
        this.leftOffset = this.width * (1-config.TEXT_RATIO);

        this.timerID = setInterval(
            () => this.tick(), config.INTERVAL
        );
    }

    calculateNextState() {
        var positions = [];
        var velocities = [];
        for (var i = 0; i < this.circles.length; i++) {
            positions.push(vec2d.addVec2D(this.circles[i].position, this.circles[i].velocity));
            var g = new vec2d.Vector2D([mathUtils.randomSign()*Math.random(), mathUtils.randomSign()*Math.random()]);
            g = vec2d.scalarMultVec2D(1/this.circles[i].mass, g);
            velocities.push(vec2d.addVec2D(this.circles[i].velocity, g));
        }

        return [positions, velocities];
    }

    updateStates(states) {
        var positions = states[0];
        var velocities = states[1];
        for (var i = 0; i < this.circles.length; i++) {
            this.circles[i].position = positions[i];
            this.circles[i].velocity = velocities[i];
        }
    }

    checkCollisionBoundary(state, radius) {
        var position = state[0], velocity = state[1];
        const scalingFactor = 0.5;
        if (position.x > this.canvasWidth-radius) {
            velocity.x = mathUtils.threshold(-scalingFactor*(velocity.x));
            position.x = this.canvasWidth-radius;
        }
        else if (position.x < radius) {
            velocity.x = mathUtils.threshold(scalingFactor*(velocity.x));
            position.x = radius;
        }

        if (position.y > this.height-radius) {
            velocity.y = mathUtils.threshold(-scalingFactor*(velocity.y));
            position.y = this.height-radius;
        }
        else if (position.y < radius) {
            velocity.y = mathUtils.threshold(-scalingFactor*(velocity.y));
            position.y = radius;
        }

        return [position, velocity];
    }

    checkCollision(x1, x2, threshold) {
        if (vec2d.eucDistance(x1, x2) < threshold)
            return true;

        return false;
    }

    checkCollisions(states) {
        var scalingFactor = 0.8;

        var positions = states[0], velocities = states[1];
        var n = this.circles.length;
        for (var i = 0; i < n; i++) {
            if (config.CIRCLE_COLLISION) {
                for (var j = 0; j < n; j++) {
                    if (i !== j) {
                        var r1 = this.circles[i].radius, r2 = this.circles[j].radius;
                        if (this.checkCollision(positions[i], positions[j],
                                                r1+r2)) {
                            var x1 = positions[i], x2 = positions[j];
                            var v1 = velocities[i], v2 = velocities[j];
                            var m1 = this.circles[i].mass, m2 = this.circles[j].mass;

                            var newV1 = elasticCollision2D(x1, x2, v1, v2, m1, m2);
                            var newV2 = elasticCollision2D(x2, x1, v2, v1, m2, m1);

                            velocities[i] = vec2d.scalarMultVec2D(scalingFactor, newV1);
                            velocities[j] = vec2d.scalarMultVec2D(scalingFactor, newV2);

                            var p = forceOut(positions[i], positions[j],
                                             r1, r2);

                            positions[i] = p[0];
                            positions[j] = p[1];
                        }
                    }
                }
            }
            this.checkCollisionBoundary([positions[i], velocities[i]], this.circles[i].radius);
        }

        return states;
    }

    mouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }

    mouseEnterRightBackground(e) {
        this.mouseLeaveLeftBackground(null);
    }

    mouseLeave(e) {
        this.mouse.x = -1000;
        this.mouse.y = -1000;
    }

    mouseLeaveLeftBackground(e) {
        const canvas = this.refs.leftBackgroundCanvas;
        const context = canvas.getContext('2d');
        context.fillStyle = 'black';
        context.fillRect(0, 0, this.leftOffset, this.height);
    }

    drawCircle(context, circle, color='black') {
        context.beginPath();
        context.arc(circle.position.x, circle.position.y, circle.radius, 0, 2*Math.PI, false);
        context.fillStyle = color;
        context.strokeStyle = color;
        context.fill();
        context.stroke();
    }

    tick() {
        if (!this.state.backgroundDrawn) {
            var background = this.refs.backgroundCanvas;
            var ctx = background.getContext('2d');
            ctx.fillStyle = config.BACKGROUND_COLOR;
            ctx.fillRect(0, 0, this.width*config.TEXT_RATIO, this.height);

            background = this.refs.leftBackgroundCanvas;
            ctx = background.getContext('2d');
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, this.width*(1-config.TEXT_RATIO), this.height);

            this.setState({ backgroundDrawn: true });
        }

        const canvas = this.refs.circleCanvas;
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, this.width, this.height);

        while (this.state.count < config.CIRCLE_COUNT) {
            this.circles.push(new Circle([mathUtils.randomInt(this.width), mathUtils.randomInt(this.height)],
                                          Math.max(config.RADIUS_DEFAULT, mathUtils.randomInt(config.RADIUS_DEFAULT*2))));

            this.setState({ count: this.state.count+1 });
        }

        context.beginPath();
        for (var i = 0; i < this.circles.length; i++)
            this.drawCircle(context, this.circles[i]);

        const can = this.refs.leftBackgroundCanvas;
        const c = can.getContext('2d');

        context.save();
        if (this.mouse.x > this.width*(1-config.TEXT_RATIO) && this.mouse.y > 0) {
            c.fillStyle = 'black';
            c.fillRect(0, 0, this.width*(1-config.TEXT_RATIO), this.height);
            const mouseCircle = new Circle([this.mouse.x-this.leftOffset, this.mouse.y], config.RADIUS_DEFAULT/2);
            this.drawCircle(context, mouseCircle, 'black');
        }
        else if (this.mouse.x > 0) {
            c.fillStyle = 'black';
            c.fillRect(0, 0, this.width*(1-config.TEXT_RATIO), this.height);
            const mouseCircle = new Circle([this.mouse.x, this.mouse.y], config.RADIUS_DEFAULT/40);
            this.drawCircle(c, mouseCircle, 'white');
        }

        context.restore();

        var states = this.calculateNextState();
        states = this.checkCollisions(states);
        this.updateStates(states);
    }

    render() {
        const pageStyle = {
            'cursor': 'none',
            'userSelect': 'none'
        }

        const textStyle = {
            'zIndex': 4,
            'position': 'absolute',
            'overflow': 'hidden',
            'height': this.height,
            'width': 100*config.TEXT_RATIO+'%',
            'top': '0px',
            'left': 100*(1-config.TEXT_RATIO)+'%',
            'color': config.BACKGROUND_COLOR,
            'fontFamily': 'verdana'
        };

        const contentStyle = {
            'zIndex': 4,
            'position': 'absolute',
            'color': 'white',
            'fontFamily': 'Courier New',
            'fontSize': config.MENU_CONTENT_HEIGHT/2+'px',
            'width': 100*(1-config.TEXT_RATIO)+'%',
            'height': config.MENU_CONTENT_HEIGHT,
            'cursor': 'none'
        };

        const backgroundStyle = {
            'zIndex': 1,
            'position': 'absolute',
            'top': '0%',
            'left': 100*(1-config.TEXT_RATIO)+'%'
        };

        const circlesStyle = {
            'zIndex': 2,
            'position': 'absolute',
            'top': '0px',
            'left': 100*(1-config.TEXT_RATIO)+'%'
        };

        const leftBackgroundStyle = {
            'zIndex': 0,
            'position': 'absolute',
            'top': '0px',
            'left': '0px'
        };

        return (
            <div style={ pageStyle }
                 onMouseMove={ this.mouseMove.bind(this) }
                 onMouseLeave={ this.mouseLeave.bind(this) }>
                <div style={ textStyle }>{ backgroundText }</div>
                <MenuText text="github" style={ contentStyle } url="https://www.github.com/JTan2231" number="1"/>
                <MenuText text="linkedin" style={ contentStyle } url="https://www.linkedin.com/in/joseph-tan-478aa5186/" number="2"/>
                <canvas style={ leftBackgroundStyle } onMouseLeave={ this.mouseLeaveLeftBackground.bind(this) }
                        ref='leftBackgroundCanvas' width={ this.leftOffset } height={ this.height }/>
                <canvas style={ backgroundStyle } ref='backgroundCanvas' width={ this.canvasWidth } height={ this.height }/>
                <canvas style={ circlesStyle } ref='circleCanvas' width={ this.canvasWidth } height={ this.height }/>
            </div>
        );
    }
}

export default PhysicsMenu;
