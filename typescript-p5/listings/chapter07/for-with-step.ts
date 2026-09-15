// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        // キャンバスを作る
        p.createCanvas(400, 220);
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        // 背景を明るい灰色で塗り直す
        p.background(245);

        const lineY: number = p.height / 2; // 線の縦方向の中心
        const lineLength: number = 40; // 線の長さ
        let lineSpacing: number = p.mouseX / 6; // 線と線の間隔

        // 間隔が小さくなりすぎないようにする
        if (lineSpacing < 8) {
            lineSpacing = 8;
        }

        p.stroke(40);

        // lineSpacing ずつ x 座標を進めながら線を描く
        for (
            let lineX: number = 0;
            lineX < p.width;
            lineX = lineX + lineSpacing
        ) {
            p.line(
                lineX,
                lineY - lineLength / 2,
                lineX,
                lineY + lineLength / 2
            );
        }
    };
};

new p5(sketch);
