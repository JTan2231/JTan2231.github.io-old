import { toleranceEquality } from './math_utils.js';

export class Vector2D {
    constructor(values) {
        this.x = values[0];
        this.y = values[1];
    }

    magnitude() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    normalize() {
        var mag = this.magnitude();
        this.x /= mag;
        this.y /= mag;
    }
}

export function normalizeVec2DOut(vec) {
    var mag = vec.magnitude();

    return new Vector2D([vec.x/mag, vec.y/mag]);
}

export function signVec2D(vec) {
    var x, y;
    if (vec.x < 0)
        x = -1;
    else
        x = 1;

    if (vec.y < 0)
        y = -1;
    else
        y = 1;

    return new Vector2D([x, y]);
}

export function multVec2D(v1, v2) {
    return new Vector2D([v1.x*v2.x, v1.y*v2.y]);
}

// NaNs are converted to zero
export function divVec2D(v1, v2) {
    var x, y;
    if (toleranceEquality(v2.x, 0))
        x = 0;
    else
        x = v1.x / v2.x;

    if (toleranceEquality(v2.y, 0))
        y = 0;
    else
        y = v1.y / v2.y;

    var out = new Vector2D([x, y]);
    return out;
}

export function addVec2D(v1, v2) {
    return new Vector2D([v1.x+v2.x, v1.y+v2.y]);
}

export function subVec2D(v1, v2) {
    return new Vector2D([v1.x-v2.x, v1.y-v2.y]);
}

export function scalarAddVec2D(scalar, vec) {
    return new Vector2D([scalar+vec.x, scalar+vec.y]);
}

export function scalarSubVec2D(scalar, vec) {
    return new Vector2D([scalar-vec.x, scalar-vec.y]);
}

export function scalarMultVec2D(scalar, vec) {
    return new Vector2D([scalar*vec.x, scalar*vec.y]);
}

export function powerVec2D(vec, power) {
    return new Vector2D([Math.pow(vec.x, power), Math.pow(vec.y, power)]);
}

export function reciprocalVec2D(vec) {
    return new Vector2D([(1/vec.x)+1e-6, (1/vec.y)+1e-6]);
}

export function clipVec2D(vec, min, max) {
    var out = new Vector2D([vec.x, vec.y]);
    out.x = Math.min(out.x, max[0]);
    out.y = Math.min(out.y, max[1]);

    out.x = Math.max(out.x, min[0]);
    out.y = Math.max(out.y, min[1]);

    return out;
}

// assumes HEIGHT == WIDTH
export function clipCircleVec2D(vec, HEIGHT=700) {
    var x = vec.x - HEIGHT/2, y = vec.y - HEIGHT/2;
    var mag = Math.sqrt(x*x + y*y);
    var scale = Math.min(mag, HEIGHT/2);

    var newCoords = [x/mag*scale+HEIGHT/2, y/mag*scale+HEIGHT/2];

    return new Vector2D(newCoords);
}

export function sanitizeVec2D(vec) {
    if (isNaN(vec.x) || isNaN(vec.y))
        return new Vector2D([0, 0]);
    else
        return vec;
}

export function setPrecisionVec2D(vec, precision=0.05) {
    return new Vector2D([vec.x.toFixed(precision), vec.y.toFixed(precision)]);
}

export function eucDistance(v1, v2) {
    var x = v1.x - v2.x;
    x = x * x;

    var y = v1.y - v2.y;
    y = y * y;

    return Math.sqrt(x + y);
}

export function vecDot2D(v1, v2) {
    return v1.x*v2.x + v1.y*v2.y;
}

export function threshold(vec, thresh=0.01) {
    var out = new Vector2D([vec.x, vec.y]);
    if (Math.abs(out.x) < thresh)
        out.x = 0;
    if (Math.abs(out.y) < thresh)
        out.y = 0;

    return out;
}
