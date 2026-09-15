// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(420, 220);  // 作成するキャンバスの幅と高さを指定する
        p.background(250);  // キャンバスを灰色で塗りつぶす

        p.noFill();  // 塗りつぶしをしない
        p.stroke(0);  // 線の色を黒にする
        p.strokeWeight(4);  // 線の太さを4ピクセルにする
        p.circle(120, 110, 120);  // 線だけの円を描く

        p.fill(100, 180, 240);  // 塗りつぶし色を水色にする
        p.noStroke();  // 線を描かない
        p.circle(300, 110, 120);  // 塗りだけの円を描く
    };
};

new p5(sketch);
