// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(400, 300);   // 作成するキャンバスの幅と高さを指定する
        p.background(245);          // キャンバスを明るい灰色で塗りつぶす

        // キャンバス中央の x 座標
        const centerX: number = p.width / 2;

        // キャンバス中央の y 座標
        const centerY: number = p.height / 2;

        // 円の直径
        const circleDiameter: number = p.width / 4;

        p.fill(180);                // 塗りつぶし色を灰色にする
        p.circle(centerX, centerY, circleDiameter);  // キャンバス中央に円を描く
    };
};

new p5(sketch);
