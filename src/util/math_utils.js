import * as config from './config.js';

export function randomSign() {
    if (Math.random() > 0.5)
        return 1;

    return -1;
}

export function toleranceEquality(a, b, tolerance=config.DEFAULT_TOLERANCE) {
    if (a - b < tolerance)
        return true;

    return false;
}

export function threshold(x, thresh=0.1) {
    if (Math.abs(x) < thresh)
        return 0;

    return x;
}

export function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function sign(x) {
    if (x < 0)
        return -1;

    return 1;
}
