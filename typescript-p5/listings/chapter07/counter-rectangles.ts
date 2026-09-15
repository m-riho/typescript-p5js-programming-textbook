// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        // キャンバスを作り、背景を明るい灰色で塗る
        p.createCanvas(400, 220);
        p.background(245);

        const rectangleWidth: number = 28; // 長方形の幅
        const rectangleHeight: number = 140; // 長方形の高さ
        const rectangleSpacing: number = 36; // 長方形と長方形の間隔
        const startX: number = 28; // 左端の長方形の x 座標
        const numberOfRectangles: number = 10; // 描く長方形の個数

        p.noStroke();

        // count を使って、位置と明るさを少しずつ変える
        for (let count: number = 0; count < numberOfRectangles; count++) {
            const rectangleX: number = startX + rectangleSpacing * count;
            const brightness: number = 40 + count * 20;

            p.fill(brightness);
            p.rect(rectangleX, 40, rectangleWidth, rectangleHeight);
        }
    };
};

new p5(sketch);
