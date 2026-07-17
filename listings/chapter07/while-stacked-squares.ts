// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        // キャンバスを作る
        p.createCanvas(260, 260);
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        // 背景を明るい灰色で塗り直す
        p.background(245);

        const squareSize: number = 24; // 正方形の一辺の長さ
        const squareSpacing: number = 8; // 正方形と正方形の間隔
        const squareX: number = p.mouseX; // 正方形の左上の x 座標
        let squareY: number = p.mouseY; // 現在描く正方形の左上の y 座標

        p.noFill();
        p.stroke(40);

        // 下端に収まる間、正方形を下方向に並べる
        while (squareY + squareSize <= p.height) {
            p.rect(squareX, squareY, squareSize, squareSize);

            // 次に描く正方形の y 座標に進める
            squareY = squareY + squareSize + squareSpacing;
        }
    };
};

new p5(sketch);
