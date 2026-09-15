// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 円の直径
    const circleDiameter: number = 50;

    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        // キャンバスを作る
        p.createCanvas(400, 240);
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        // 背景を明るい灰色で塗り直す
        p.background(245);

        // 円の色を指定する
        p.fill(120, 210, 170);

        // マウスの位置に円を描く
        p.circle(p.mouseX, p.mouseY, circleDiameter);
    };
};

new p5(sketch);
