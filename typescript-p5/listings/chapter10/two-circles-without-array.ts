// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    let circleX0: number = 80; // 1つ目の円の中心の x 座標
    let circleY0: number = -20; // 1つ目の円の中心の y 座標
    let circleSpeed0: number = 2; // 1つ目の円の下向きの速さ
    let circleX1: number = 220; // 2つ目の円の中心の x 座標
    let circleY1: number = -60; // 2つ目の円の中心の y 座標
    let circleSpeed1: number = 1.5; // 2つ目の円の下向きの速さ
    const circleRadius: number = 12; // 円の半径

    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(300, 400);
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        p.background(245);

        // 1つ目の円を下へ動かし、画面外に出たら上へ戻す
        circleY0 = circleY0 + circleSpeed0;
        if (circleY0 - circleRadius > p.height) {
            circleX0 = p.random(circleRadius, p.width - circleRadius);
            circleY0 = p.random(-circleRadius * 6, -circleRadius);
            circleSpeed0 = p.random(1, 3);
        }

        // 2つ目の円にも、同じような処理を書く必要がある
        circleY1 = circleY1 + circleSpeed1;
        if (circleY1 - circleRadius > p.height) {
            circleX1 = p.random(circleRadius, p.width - circleRadius);
            circleY1 = p.random(-circleRadius * 6, -circleRadius);
            circleSpeed1 = p.random(1, 3);
        }

        // 2つの円を描く
        p.fill(230, 80, 80);
        p.stroke(60);
        p.circle(circleX0, circleY0, circleRadius * 2);
        p.circle(circleX1, circleY1, circleRadius * 2);
    };
};

new p5(sketch);
