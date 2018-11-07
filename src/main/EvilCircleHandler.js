import EvilCircle from './EvilCircle';
import { Draw, CheckBounds, CollisionDetection, Update } from './EvilCircleVisitor';
import Shape from './Shape';
import Curator from './KeyCurator';

export default class EvilCircleHandler {

    constructor(payload) {
        this._keys = new Curator();
        this._evil = new EvilCircle(new Shape(0, 0, 0, 0, true), 'red', 20);
        this._draw = new Draw(payload.context);
        this._update = new Update(this._keys);
        this._bounds = new CheckBounds(payload.width, payload.height);
        this._detect = new CollisionDetection(payload.balls, payload.callback);
        this.initialize();
    }

    initialize() {
        window.onkeydown = e => {
            switch (e.keyCode) {
                case Curator.RIGHT_D:
                case Curator.UP_W:
                case Curator.LEFT_A:
                case Curator.DOWN_S:
                case Curator.RIGHT:
                case Curator.UP:
                case Curator.LEFT:
                case Curator.DOWN:
                    this._keys.onKeydown(e);
                    break;
                default:
                    break;
            }
        }

        window.onkeyup = e => {
            this._keys.onKeyup(e);
        }
    }

    run() {
        this._evil.do(this._update).do(this._draw).do(this._bounds).do(this._detect);
    }
}