// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    const numberOfCircles: number = 10; // 円の個数
    const circleX: number[] = []; // 円の中心の x 座標
    const circleY: number[] = []; // 円の中心の y 座標
    const circleSpeed: number[] = []; // 円の下向きの速さ
    const circleRadius: number = 12; // 円の半径

    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(300, 400);

        // それぞれの円の最初の位置と速さを決める
        for (let index: number = 0; index < numberOfCircles; index++) {
            circleX[index] = p.random(circleRadius, p.width - circleRadius);
            circleY[index] = p.random(-circleRadius * 8, -circleRadius);
            circleSpeed[index] = p.random(1, 3);
        }
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        p.background(245);

        // 配列の添字番号を使って、すべての円を順番に処理する
        for (let index: number = 0; index < circleX.length; index++) {
            // 現在の円を下へ動かす
            circleY[index] = circleY[index] + circleSpeed[index];

            // 画面の下へ出たら、上から落ち直す
            if (circleY[index] - circleRadius > p.height) {
                circleX[index] = p.random(circleRadius, p.width - circleRadius);
                circleY[index] = p.random(-circleRadius * 8, -circleRadius);
                circleSpeed[index] = p.random(1, 3);
            }

            // 現在の円を描く
            p.fill(230, 80, 80);
            p.stroke(60);
            p.circle(circleX[index], circleY[index], circleRadius * 2);
        }
    };
};

new p5(sketch);
