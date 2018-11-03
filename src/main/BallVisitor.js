export class Draw {
    constructor(context) {
        this.ctx = context;
    }

    visit(ball) {
        this.ctx.beginPath();
        this.ctx.fillStyle = ball.color;
        this.ctx.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI);
        this.ctx.fill();
    };
}

export class Update {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    visit(ball) {
        if (this.is_going_off_the_right_hand_edge(ball) ||
            this.is_going_off_the_left_hand_edge(ball)) ball.velX = -(ball.velX);

        if (this.is_going_off_the_bottom_edge(ball) ||
            this.is_going_off_the_top_edge(ball)) ball.velY = -(ball.velY);

        ball.x += ball.velX;
        ball.y += ball.velY;
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