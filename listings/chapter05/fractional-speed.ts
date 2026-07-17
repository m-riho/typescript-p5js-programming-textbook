// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 円の中心の y 座標
    let circleY: number = 0;

    // 円の中心の x 座標
    const circleX: number = 200;

    // 円の直径
    const circleDiameter: number = 40;

    // 1回のdrawで円が下に進む量
    const circleSpeed: number = 0.8;

    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(400, 240);   // 作成するキャンバスの幅と高さを指定する
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        p.background(245);          // キャンバスを明るい灰色で塗りつぶす

        p.fill(120, 210, 170);      // 塗りつぶし色を緑にする
        p.circle(circleX, circleY, circleDiameter);  // 現在の位置に円を描く

        circleY = circleY + circleSpeed;  // 次のdrawで描く位置を下に動かす
    };
};

new p5(sketch);
