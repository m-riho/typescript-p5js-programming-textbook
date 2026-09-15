// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(400, 200);   // 作成するキャンバスの幅と高さを指定する
        p.background(250);          // キャンバスを明るい灰色で塗りつぶす

        // 円の半径
        const circleRadius: number = 40;

        // 円の直径
        const circleDiameter: number = circleRadius * 2;

        p.fill(120, 180, 240);      // 塗りつぶし色を青にする
        p.circle(200, 100, circleDiameter);  // 計算した直径で円を描く

        console.log(circleDiameter);  // 計算した直径をコンソールに表示する
    };
};

new p5(sketch);
