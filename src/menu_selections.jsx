import React from 'react';
import * as vec2d from './vec2d.js';
import * as mathUtils from './math_utils.js';
import * as config from './config.js';
import { backgroundText } from './background_text.js';
import { MenuText } from './menu_text.js';
import { styles } from './menu_styles.js';

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

class MenuSelections extends React.Component {
    constructor(props) {
        super(props);

        this.width = 0;
        this.height = 0;

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

        this.backgroundCanvas = React.createRef();
        this.leftBackgroundCanvas = React.createRef();
        this.circleCanvas = React.createRef();
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

    mouseLeave(e) {
        this.mouse.x = -1000;
        this.mouse.y = -1000;
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
            var background = this.leftBackgroundCanvas.current;
            var ctx = background.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, this.leftOffset, this.height);

            this.setState({ backgroundDrawn: true });
        }

        const can = this.leftBackgroundCanvas.current;
        const c = can.getContext('2d');
    }

    render() {
        const pageStyle = {
            'userSelect': 'none',
            'height': this.height,
            'width': this.width,
            'position': 'fixed',
            'top': '0',
            'left': '0.43%'
        };

        var menuTextStart = 5;
        var links = [<MenuText text="kaggle" style={ styles.contentStyle } url="https://www.kaggle.com/jtan2231" number={ menuTextStart++ }/>,
                     <MenuText text="website source" style={ styles.contentStyle } url="https://github.com/JTan2231/JTan2231.github.io/tree/dev" number={ menuTextStart++ }/>,
                     <MenuText text="bartholomew robot" style={ styles.contentStyle } url="https://github.com/JTan2231/bartholomew" number={ menuTextStart++ }/>,
                     <MenuText text="echo state network" style={ styles.contentStyle } url="https://github.com/JTan2231/ESN" number={ menuTextStart++ }/>];

        return (
            <div style={ pageStyle }
                 onMouseMove={ this.mouseMove.bind(this) }
                 onMouseLeave={ this.mouseLeave.bind(this) }>
                <MenuText text="github" style={ styles.githubStyle } url="https://www.github.com/JTan2231" number="1"/>
                <MenuText text="linkedin" style={ styles.linkedinStyle } url="https://www.linkedin.com/in/joseph-tan-478aa5186/" number="1"/>
                <MenuText text="twitter" style={ styles.linkedinStyle } url="https://www.twitter.com/joeymtan/" number="2"/>
                { links }
                <canvas style={ styles.leftBackgroundStyle } ref={ this.leftBackgroundCanvas } width={ this.leftOffset } height={ this.height }/>
            </div>
        );
    }
}

export default MenuSelections;
