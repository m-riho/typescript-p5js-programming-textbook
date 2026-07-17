// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // 1つの円の状態をまとめたオブジェクト
    let ball: {
        centerX: number;
        centerY: number;
        radius: number;
        speedY: number;
        color: p5.Color;
    };

    p.setup = (): void => {
        p.createCanvas(300, 360);
        p.colorMode(p.HSB, 360, 100, 100);

        // 円の状態を持つオブジェクトを関数で作る
        ball = createBall(p, p.width / 2, -20);
    };

    p.draw = (): void => {
        p.background(0, 0, 96);
        // 同じオブジェクトを、更新用と描画用の関数に渡す
        updateBall(p, ball);
        displayBall(p, ball);
    };
};

// 円の初期状態をまとめて作る
function createBall(
    p: p5,
    centerX: number,
    centerY: number
): {
    centerX: number;
    centerY: number;
    radius: number;
    speedY: number;
    color: p5.Color;
} {
    return {
        centerX: centerX,
        centerY: centerY,
        radius: 18,
        speedY: 2,
        color: p.color(200, 70, 90),
    };
}

// 受け取った円の位置を更新する
function updateBall(
    p: p5,
    ball: {
        centerX: number;
        centerY: number;
        radius: number;
        speedY: number;
        color: p5.Color;
    }
): void {
    ball.centerY = ball.centerY + ball.speedY;

    if (ball.centerY - ball.radius > p.height) {
        // 画面の下へ出たら、上からもう一度落とす
        ball.centerY = -ball.radius;
    }
}

// 受け取った円の状態を使って描く
function displayBall(
    p: p5,
    ball: {
        centerX: number;
        centerY: number;
        radius: number;
        speedY: number;
        color: p5.Color;
    }
): void {
    p.fill(ball.color);
    p.stroke(40);
    p.circle(ball.centerX, ball.centerY, ball.radius * 2);
}

new p5(sketch);
