import BallBuilder from './BallBuilder';
import { Draw, Update, CollisionDetection } from './BallVisitor';
import { random } from './toolbox';

export default class BallHandler {

    constructor(payload) {
        this._balls = payload.balls;
        this._draw = new Draw(payload.context);
        this._update = new Update(payload.width, payload.height);
        this._detect = new CollisionDetection(payload.balls);
        this._fillBucketOfBalls(payload);
    }

    run() {
        this._balls.forEach(ball => ball.do(this._draw).do(this._update).do(this._detect));
    }

    _fillBucketOfBalls(payload) {
        const { balls, width, height } = payload;

        while (balls.length < 25) {
            const size = this._makeRandomSize();

            const ball = new BallBuilder().x(this._makeRandomPosition(width, size))
                .y(this._makeRandomPosition(height, size))
                .velX(this._makeRandomVelocity())
                .velY(this._makeRandomVelocity())
                .color(this._makeRandomColor())
                .size(size)
                .build();

            balls.push(ball);
        }
    }

    _makeRandomPosition(boundary, size) {
        return random(0 + size, boundary - size);
    }

    _makeRandomVelocity() {
        return random(-7, 7);
    }

    _makeRandomColor() {
        return 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
    }

    _makeRandomSize() {
        return random(10, 20);
    }
}