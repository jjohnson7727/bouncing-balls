import Ball from "./Ball";

export default class BallBuilder {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._velX = 0;
        this._velY = 0;
        this._color = 'white';
        this._size = 10;
    }

    x(x) {
        this._x = x;
        return this;
    }

    y(y) {
        this._y = y;
        return this;
    }

    velX(x) {
        this._velX = x;
        return this;
    }

    velY(y) {
        this._velY = y;
        return this;
    }

    color(color) {
        this._color = color;
        return this;
    }

    size(size) {
        this._size = size;
        return this;
    }

    build() {
        return new Ball(this._x, this._y, this._velX, this._velY, this._color, this._size);
    }
}