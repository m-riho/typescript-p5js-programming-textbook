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

        // 1つの変数の中に、円に必要な値をまとめる
        ball = {
            centerX: p.width / 2,
            centerY: -20,
            radius: 18,
            speedY: 2,
            color: p.color(200, 70, 90),
        };
    };

    p.draw = (): void => {
        p.background(0, 0, 96);

        // オブジェクトの中の y 座標を更新して円を下へ動かす
        ball.centerY = ball.centerY + ball.speedY;

        if (ball.centerY - ball.radius > p.height) {
            // 画面の下へ出たら、上からもう一度落とす
            ball.centerY = -ball.radius;
        }

        // オブジェクトの値を使って円を描く
        p.fill(ball.color);
        p.stroke(40);
        p.circle(ball.centerX, ball.centerY, ball.radius * 2);
    };
};

new p5(sketch);
