import Curator from './KeyCurator';

export class Draw {
    constructor(context) {
        this.ctx = context;
    }

    visit(ball) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = ball.color;
        this.ctx.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI);
        this.ctx.stroke();
    };
}

export class CheckBounds {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    visit(ball) {
        if (this.is_going_off_the_right_hand_edge(ball)) ball.x = ball.x - 1;
        if (this.is_going_off_the_left_hand_edge(ball)) ball.x = ball.x + 1;

        if (this.is_going_off_the_bottom_edge(ball)) ball.y = ball.y - 1;
        if (this.is_going_off_the_top_edge(ball)) ball.y = ball.y + 1;
    }

    is_going_off_the_right_hand_edge(ball) {
        return (ball.x + ball.size) >= this.width;
    }

    is_going_off_the_left_hand_edge(ball) {
        return (ball.x - ball.size) <= 0;
    }

    is_going_off_the_bottom_edge(ball) {
        return (ball.y + ball.size) >= this.height;
    }

    is_going_off_the_top_edge(ball) {
        return (ball.y - ball.size) <= 0;
    }
}

export class Update {

    constructor(key) {
        this._key = key;
    }

    visit(ball) {
        if (this.wantsToMoveUp()) this.moveUp(ball);
        if (this.wantsToMoveLeft()) this.moveLeft(ball);
        if (this.wantsToMoveDown()) this.moveDown(ball);
        if (this.wantsToMoveRight()) this.moveRight(ball);
    }

    wantsToMoveUp() {
        return this._key.isDown(Curator.UP) || this._key.isDown(Curator.UP_W);
    }

    wantsToMoveLeft() {
        return this._key.isDown(Curator.LEFT) || this._key.isDown(Curator.LEFT_A);
    }

    wantsToMoveRight() {
        return this._key.isDown(Curator.RIGHT) || this._key.isDown(Curator.RIGHT_D);
    }

    wantsToMoveDown() {
        return this._key.isDown(Curator.DOWN) || this._key.isDown(Curator.DOWN_S);
    }

    moveUp(ball) {
        ball.y -= ball.velY;
    }

    moveLeft(ball) {
        ball.x -= ball.velX;
    }

    moveDown(ball) {
        ball.y += ball.velY;
    }

    moveRight(ball) {
        ball.x += ball.velX;
    }
}

export class CollisionDetection {
    constructor(balls, callback) {
        this.balls = balls;
        this.callback = callback;
    }

    visit(ball) {
        this.balls.forEach(subject => {
            if (subject.exists) {
                const dx = ball.x - subject.x;
                const dy = ball.y - subject.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < ball.size + subject.size - 3) {
                    subject.exists = false;
                    this.callback();
                }
            }
        });
    }
}