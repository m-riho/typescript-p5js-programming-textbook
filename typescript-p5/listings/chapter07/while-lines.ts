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
        let lineX: number = 30; // 現在描く線の x 座標

        p.stroke(40);

        // x 座標を右へ進めながら、縦線を描く
        while (lineX <= 270) {
            p.line(lineX, 30, lineX, 190);

            // 次に描く線の x 座標に進める
            lineX = lineX + lineSpacing;
        }
    };
};

new p5(sketch);
