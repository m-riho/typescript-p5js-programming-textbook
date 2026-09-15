// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 四角形の左上の x 座標
    let squareX: number = 180;

    // 四角形の左上の y 座標
    const squareY: number = 100;

    // 四角形の一辺の長さ
    const squareSize: number = 40;

    // キーを1回押したときに動く量
    const moveDistance: number = 10;

    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        // キャンバスを作る
        p.createCanvas(400, 240);
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        // 背景を明るい灰色で塗り直す
        p.background(245);

        // 四角形の色を指定する
        p.fill(120, 180, 240);

        // 現在の座標に四角形を描く
        p.rect(squareX, squareY, squareSize, squareSize);
    };

    // キーが押されたときに実行される処理
    p.keyPressed = (): void => {
        // a キーなら左へ動かす
        if (p.key === "a") {
            squareX = squareX - moveDistance;
        }

        // d キーなら右へ動かす
        if (p.key === "d") {
            squareX = squareX + moveDistance;
        }
    };
};

new p5(sketch);
