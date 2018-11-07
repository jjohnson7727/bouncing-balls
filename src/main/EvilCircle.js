import Ball from './Ball';

export default class EvilCircle extends Ball {

    constructor(shape, color, size) {
        super(shape, color, size);
    }

    get velX() {
        return 20;
    }

    get velY() {
        return 20;
    }

    set velX(velX) {}

    set velY(velY) {}
}