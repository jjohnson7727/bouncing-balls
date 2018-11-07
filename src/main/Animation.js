import BallHandler from './BallHandler';
import EvilCircleHandler from './EvilCircleHandler';

export default class Animation {

  constructor() {
    this._payload = {
      context: null,
      width: 0,
      height: 0,
      balls: [],
      callback: null
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

  callback(callback) {
    this._payload.callback = callback;
    return this;
  }

  preLaunch() {
    this.handlers.push(new BallHandler(this._payload));
    this.handlers.push(new EvilCircleHandler(this._payload));
    return this;
  }

  loop() {
    this._washCanvas();
    this.handlers.forEach(handle => handle.run());
    requestAnimationFrame(() => this.loop());
  }

  _washCanvas() {
    this._payload.context.fillStyle = 'rgba(0, 0, 0, 0.75)';
    this._payload.context.fillRect(0, 0, this._payload.width, this._payload.height);
  }
}