import BallHandler from './BallHandler';
import EvilCircleHandler from './EvilCircleHandler';

export default class Animation {

  constructor() {
    this._payload = {
      totalBalls: 0,
      context: null,
      width: 0,
      height: 0,
      balls: [],
      callback: null,
      trigger: false
    }
    this.handlers = [];
  }

  context(context) {
    this._payload.context = context;
    return this;
  }

  width(width) {
    this._payload.width = width;
    return this;
  }

  height(height) {
    this._payload.height = height;
    return this;
  }

  balls(x) {
    this._payload.totalBalls = x;
    return this;
  }

  start() {
    this.resetGame();
    this._payload.trigger = true;
    this.loop();
  }

  stop() {
    this._payload.trigger = false;
  }

  callback(callback) {
    this._payload.callback = callback;
    return this;
  }

  initialize() {
    this._washCanvas();
    return this;
  }

  resetGame() {
    this.handlers = [];
    this._payload.balls = [];
    this.handlers.push(new BallHandler(this._payload));
    this.handlers.push(new EvilCircleHandler(this._payload));
    this._washCanvas();
  }

  loop() {
    if (this._payload.trigger) {
      this._washCanvas();
      this.handlers.forEach(handle => handle.run());
      requestAnimationFrame(() => this.loop());
    }
  }

  _washCanvas() {
    this._payload.context.fillStyle = 'rgba(0, 0, 0, 0.75)';
    this._payload.context.fillRect(0, 0, this._payload.width, this._payload.height);
  }
}