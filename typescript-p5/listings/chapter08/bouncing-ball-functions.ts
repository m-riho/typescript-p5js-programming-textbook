// p5.jsの機能を取り込む
import p5 from "p5";

let ballX: number = 200; // ボールの中心の x 座標
let ballSpeed: number = 2; // ボールが1フレームで進む量
const ballRadius: number = 24; // ボールの半径

// ボールの位置を更新する
function moveBall(): void {
    ballX = ballX + ballSpeed;
}

// 端に着いたら、ボールの向きを反転させる
function bounceBall(p: p5): void {
    if (ballX + ballRadius > p.width) {
        ballX = p.width - ballRadius;
        ballSpeed = -ballSpeed;
    } else if (ballX - ballRadius < 0) {
        ballX = ballRadius;
        ballSpeed = -ballSpeed;
    }
}

// 現在の位置にボールを描く
function displayBall(p: p5): void {
    p.stroke(40);
    p.fill(120);
    p.circle(ballX, p.height / 2, ballRadius * 2);
}

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(420, 220);
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        p.background(245);

        // 更新、判定、描画を順番に実行する
        moveBall();
        bounceBall(p);
        displayBall(p);
    };
};

new p5(sketch);
