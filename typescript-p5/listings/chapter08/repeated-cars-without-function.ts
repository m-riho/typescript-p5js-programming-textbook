// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        // キャンバスを作る
        p.createCanvas(420, 220);
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        // 背景を明るい灰色で塗り直す
        p.background(245);

        // 車体を中心座標で描く設定にする
        p.rectMode(p.CENTER);
        p.stroke(40);

        // 1台目の車を描く
        p.fill(160);
        p.rect(140, 110, 120, 50);
        p.fill(40);
        p.circle(100, 140, 24);
        p.circle(180, 140, 24);

        // 2台目の車を描く
        p.fill(160);
        p.rect(280, 110, 120, 50);
        p.fill(40);
        p.circle(240, 140, 24);
        p.circle(320, 140, 24);
    };
};

new p5(sketch);
