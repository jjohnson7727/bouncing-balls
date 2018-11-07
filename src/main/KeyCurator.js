export default class KeyCurator {

    constructor() {
        this._pressed = {}
    }

    static get RIGHT_D() { return 68; }
    static get UP_W() { return 87; }
    static get LEFT_A() { return 65; }
    static get DOWN_S() { return 83; }
    static get RIGHT() { return 39; }
    static get UP() { return 38; }
    static get LEFT() { return 37; }
    static get DOWN() { return 40; }

    isDown(keyCode) {
        return this._pressed[keyCode];
    }

    onKeydown(event) {
        this._pressed[event.keyCode] = true;
        
    }

    onKeyup(event) {
        delete this._pressed[event.keyCode];
    }
};