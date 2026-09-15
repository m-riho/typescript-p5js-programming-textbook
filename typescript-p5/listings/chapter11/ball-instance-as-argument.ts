// p5.jsの機能を取り込む
import p5 from "p5";

class Ball {
    // 円の中心の x 座標
    centerX: number;
    // 円の中心の y 座標
    centerY: number;
    // 円の半径
    radius: number;
    // 円の色
    color: p5.Color;

    constructor(
        p: p5,
        centerX: number,
        centerY: number,
        radius: number,
        hue: number
    ) {
        // 引数で受け取った値を、このBallの状態として保存する
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.color = p.color(hue, 70, 90);
    }

    display(p: p5): void {
        // 自分自身が持っている値を使って円を描く
        p.fill(this.color);
        p.stroke(40);
        p.circle(this.centerX, this.centerY, this.radius * 2);
    }
}

const sketch = (p: p5): void => {
    // 判定に使う円
    let ball: Ball;

    p.setup = (): void => {
        p.createCanvas(320, 240);
        p.colorMode(p.HSB, 360, 100, 100);
        ball = new Ball(p, p.width / 2, p.height / 2, 50, 200);
    };

    p.draw = (): void => {
        p.background(0, 0, 96);

        ball.display(p);

        // Ballそのものを関数に渡して、マウスとの関係を調べる
        if (isMouseOverBall(p, ball)) {
            drawMessage(p, ball, "inside");
        }
    };
};

// マウスがBallの内側にあるかを調べる
function isMouseOverBall(p: p5, ball: Ball): boolean {
    // マウスと円の中心との距離
    const distanceFromCenter: number = p.dist(
        p.mouseX,
        p.mouseY,
        ball.centerX,
        ball.centerY
    );

    return distanceFromCenter <= ball.radius;
}

// Ballの中心に文字を表示する
function drawMessage(p: p5, ball: Ball, message: string): void {
    p.fill(0, 0, 20);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.text(message, ball.centerX, ball.centerY);
}

new p5(sketch);
