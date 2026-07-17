// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        // キャンバスを作り、背景を明るい灰色で塗る
        p.createCanvas(320, 220);
        p.background(245);

        const lineSpacing: number = 30; // 線と線の間隔
        const startX: number = 30; // 左端の線の x 座標
        const numberOfLines: number = 9; // 線の本数

        p.stroke(40);

        // count を使って、左から順に縦線を描く
        for (let count: number = 0; count < numberOfLines; count++) {
            const lineX: number = startX + lineSpacing * count; // 線の x 座標

            p.line(lineX, 30, lineX, 190);
        }
    };
};

new p5(sketch);
