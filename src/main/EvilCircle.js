import Ball from './Ball';

export default class EvilCircle extends Ball {

    get velX() {
        return 3;
    }

    get velY() {
        return 3;
    }

    set velX(velX) {}

    set velY(velY) {}
}