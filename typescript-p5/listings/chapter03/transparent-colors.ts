// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(420, 240);  // 作成するキャンバスの幅と高さを指定する
        p.background(255);  // キャンバスを白で塗りつぶす

        p.noStroke();  // 図形の線を描かない

        p.fill(255, 0, 0, 150);  // 半透明の赤にする
        p.circle(170, 120, 150);  // 半透明の赤い円を描く

        p.fill(0, 100, 255, 150);  // 半透明の青にする
        p.circle(250, 120, 150);  // 半透明の青い円を描く
    };
};

new p5(sketch);
