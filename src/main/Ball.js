export default class Ball {

    constructor(shape, color, size) {
        this.shape = shape;
        this.color = color;
        this.size = size;
    }

    do(visitor) {
        visitor.visit(this);
        return this;
    };

    get x() {
        return this.shape.x;
    }

    get y() {
        return this.shape.y;
    }

    get velX() {
        return this.shape.velX;
    }

    get velY() {
        return this.shape.velY;
    }

    get exists() {
        return this.shape.exists;
    }

    set x(x) {
        this.shape.x = x;
    }

    set y(y) {
        this.shape.y = y;
    }

    set velX(velX) {
        this.shape.velX = velX;
    }

    set velY(velY) {
        this.shape.velY = velY;
    }

    set exists(exists) {
        this.shape.exists = exists;
    }
}