// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(400, 240);  // 作成するキャンバスの幅と高さを指定する
        p.background(250);  // キャンバスを灰色で塗りつぶす

        p.rect(80, 70, 180, 80);  // 先に長方形を描く
        p.circle(220, 130, 130);  // 後から円を描くので、円が手前に表示される
    };
};

new p5(sketch);
