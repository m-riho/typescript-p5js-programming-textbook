// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    const numberOfCircles: number = 18; // 円の個数
    const circleX: number[] = []; // 円の中心の x 座標
    const circleY: number[] = []; // 円の中心の y 座標
    const circleRadius: number[] = []; // 円の半径
    const circleColor: p5.Color[] = []; // 円の色

    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(360, 280);
        p.colorMode(p.HSB, 360, 100, 100);

        // 静止画なので draw を1回だけ実行する
        p.noLoop();

        // 同じ添字番号に、同じ円の情報を保存する
        for (let index: number = 0; index < numberOfCircles; index++) {
            circleRadius[index] = p.random(8, 24);
            circleX[index] = p.random(
                circleRadius[index],
                p.width - circleRadius[index]
            );
            circleY[index] = p.random(
                circleRadius[index],
                p.height - circleRadius[index]
            );
            circleColor[index] = p.color(p.random(360), 80, 90);
        }
    };

    // 1回だけ実行される描画処理
    p.draw = (): void => {
        p.background(0, 0, 98);
        p.noStroke();

        // 配列に保存した情報を使って、すべての円を描く
        for (let index: number = 0; index < circleX.length; index++) {
            p.fill(circleColor[index]);
            p.circle(circleX[index], circleY[index], circleRadius[index] * 2);
        }
    };
};

new p5(sketch);
