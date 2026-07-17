// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(400, 260);
        p.colorMode(p.HSB, 360, 100, 100);

        // 静止画なので draw を1回だけ実行する
        p.noLoop();
    };

    // 1回だけ実行される描画処理
    p.draw = (): void => {
        p.background(0, 0, 98);
        p.noStroke();

        // 四角形を描くたびに、座標軸の原点を右下へ動かす
        for (let count: number = 0; count < 6; count++) {
            p.fill(count * 55, 70, 90);
            p.rect(0, 0, 48, 48);

            p.translate(58, 32);
        }
    };
};

new p5(sketch);
