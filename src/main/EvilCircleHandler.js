import EvilCircle from './EvilCircle';
import { Draw, CheckBounds, CollisionDetection } from './EvilCircleVisitor';
import Shape from './Shape';

export default class EvilCircleHandler {

    constructor(payload) {
        this._evil = new EvilCircle(new Shape(0, 0, 0, 0, true), 'red', 20);
        this._draw = new Draw(payload.context);
        this._bounds = new CheckBounds(payload.width, payload.height);
        this._detect = new CollisionDetection(payload.balls, payload.callback);
        this.initialize();
    }

    initialize() {
        window.onkeydown = e => {
            if (e.keyCode === 65) {
                this._evil.x -= this._evil.velX;
            } else if (e.keyCode === 68) {
                this._evil.x += this._evil.velX;
            } else if (e.keyCode === 87) {
                this._evil.y -= this._evil.velY;
            } else if (e.keyCode === 83) {
                this._evil.y += this._evil.velY;
            }
        }
    }

    run() {
        this._evil.do(this._draw).do(this._bounds).do(this._detect);
    }
}