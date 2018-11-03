import BallBuilder from './BallBuilder';
import { Draw, Update } from './BallVisitor';

export default class Ballimation {
  constructor() {
    this._balls = [];
    this._ctx = null;
    this._draw = null;
    this._update = null;
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

  prelaunch() {
    this._draw = new Draw(this._ctx);
    this._update = new Update(this._width, this._height);
    this.fillBucketOfBalls();
    return this;
  }

  loop() {
    this.resetCanvas();
    this.shakeBucketOfBalls();
    requestAnimationFrame(() => this.loop());
  }

  resetCanvas() {
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
    this._balls.forEach(ball => ball.do(this._draw).do(this._update));
  }

  makeRandomX(size) {
    return this.random(0 + size, this._width - size);
  }

  makeRandomY(size) {
    return this.random(0 + size, this._height - size);
  }

  makeRandomVelocity() {
    return this.random(-7, 7);
  }

  makeRandomColor() {
    return 'rgb(' + this.random(0, 255) + ',' + this.random(0, 255) + ',' + this.random(0, 255) + ')';
  }

  makeRandomSize() {
    return this.random(10, 20);
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}