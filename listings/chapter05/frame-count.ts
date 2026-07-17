// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(400, 240);   // 作成するキャンバスの幅と高さを指定する
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        p.background(245);          // キャンバスを明るい灰色で塗りつぶす

        // フレーム数から作る円の直径
        const circleDiameter: number = 40 + p.frameCount * 0.5;

        p.fill(240, 160, 190);      // 塗りつぶし色をピンクにする
        p.circle(200, 120, circleDiameter);  // 計算した直径で円を描く
    };
};

new p5(sketch);
