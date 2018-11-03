import BallBuilder from './BallBuilder';
import { Draw, Update, CollisionDetection } from './BallVisitor';
import { random } from './toolbox';

export default class Ballimation {
  constructor() {
    this._balls = [];
    this._ctx = null;
    this._draw = null;
    this._update = null;
    this._detect = null;
    this._width = 0;
    this._height = 0;
  }

  context(context) {
    this._ctx = context;
    return this;
  }

  width(width) {
    this._width = width;
    return this;
  }

  height(height) {
    this._height = height;
    return this;
  }

  preLaunch() {
    this._draw = new Draw(this._ctx);
    this._update = new Update(this._width, this._height);
    this._detect = new CollisionDetection(this._balls);
    this.fillBucketOfBalls();
    return this;
  }

  loop() {
    this.washCanvas();
    this.shakeBucketOfBalls();
    requestAnimationFrame(() => this.loop());
  }

  washCanvas() {
    this._ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    this._ctx.fillRect(0, 0, this._width, this._height);
  }

  fillBucketOfBalls() {
    while (this._balls.length < 25) {
      const size = this.makeRandomSize();
      const ball = new BallBuilder().x( this.makeRandomX(size) )
                                    .y( this.makeRandomY(size) )
                                    .velX( this.makeRandomVelocity() )
                                    .velY( this.makeRandomVelocity() )
                                    .color( this.makeRandomColor() )
                                    .size( size )
                                    .build();
      this._balls.push(ball);
    }
  }

  shakeBucketOfBalls() {
    this._balls.forEach(ball => ball.do(this._draw).do(this._update).do(this._detect));
  }

  makeRandomX(size) {
    return random(0 + size, this._width - size);
  }

  makeRandomY(size) {
    return random(0 + size, this._height - size);
  }

  makeRandomVelocity() {
    return random(-7, 7);
  }

  makeRandomColor() {
    return 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
  }

  makeRandomSize() {
    return random(10, 20);
  }
}