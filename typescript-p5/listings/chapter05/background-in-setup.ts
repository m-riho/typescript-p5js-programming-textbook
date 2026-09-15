// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 円の中心の x 座標
    let circleX: number = 40;

    // 円の中心の y 座標
    const circleY: number = 120;

    // 円の直径
    const circleDiameter: number = 24;

    // 1回のdrawで円が右に進む量
    const circleSpeed: number = 3;

    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(400, 240);   // 作成するキャンバスの幅と高さを指定する
        p.background(245);          // 最初に一度だけ背景を塗る
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        p.noStroke();               // 枠線を描かないようにする
        p.fill(80, 140, 240, 120);  // 少し透明な青で塗りつぶす
        p.circle(circleX, circleY, circleDiameter);  // 現在の位置に円を描く

        circleX = circleX + circleSpeed;  // 次のdrawで描く位置を右に動かす
    };
};

new p5(sketch);
