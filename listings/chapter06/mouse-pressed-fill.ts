// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 円の中心の x 座標
    const circleX: number = 200;

    // 円の中心の y 座標
    const circleY: number = 120;

    // 円の直径
    const circleDiameter: number = 80;

    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        // キャンバスを作る
        p.createCanvas(400, 240);
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        // 背景を明るい灰色で塗り直す
        p.background(245);

        // 通常時の円の色を指定する
        p.fill(180);

        // マウスボタンが押されている間だけ色を変える
        if (p.mouseIsPressed) {
            p.fill(40);
        }

        // 現在の色で円を描く
        p.circle(circleX, circleY, circleDiameter);
    };
};

new p5(sketch);
