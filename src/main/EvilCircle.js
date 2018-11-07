import Ball from './Ball';

export default class EvilCircle extends Ball {

    get velX() {
        return 2.5;
    }

    get velY() {
        return 2.5;
    }

    set velX(velX) {}

    set velY(velY) {}
}