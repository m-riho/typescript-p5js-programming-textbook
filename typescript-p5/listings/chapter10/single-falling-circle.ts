// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    let circleX: number = 150; // 円の中心の x 座標
    let circleY: number = -20; // 円の中心の y 座標
    let circleSpeed: number = 2; // 円の下向きの速さ
    const circleRadius: number = 12; // 円の半径

    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(300, 400);

        // 最初の位置と速さをランダムに決める
        circleX = p.random(circleRadius, p.width - circleRadius);
        circleY = p.random(-circleRadius * 6, -circleRadius);
        circleSpeed = p.random(1, 3);
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        p.background(245);

        // 円を下へ動かす
        circleY = circleY + circleSpeed;

        // 画面の下へ出たら、上から落ち直す
        if (circleY - circleRadius > p.height) {
            circleX = p.random(circleRadius, p.width - circleRadius);
            circleY = p.random(-circleRadius * 6, -circleRadius);
            circleSpeed = p.random(1, 3);
        }

        // 円を描く
        p.fill(230, 80, 80);
        p.stroke(60);
        p.circle(circleX, circleY, circleRadius * 2);
    };
};

new p5(sketch);
