// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // 画面を横切る文字列
    const message: string = "The quick brown fox jumps over the lazy dog";
    // 文字列を描き始める x 座標
    let messageX: number = 400;
    // 文字列の左向きの速さ
    const messageSpeed: number = 2;

    p.setup = (): void => {
        p.createCanvas(400, 180);
        p.textSize(20);
    };

    p.draw = (): void => {
        p.background(250);

        // 現在のx座標から文字列を描き始める
        p.fill(40);
        p.text(message, messageX, 90);

        // x座標を小さくして、文字列を左へ動かす
        messageX = messageX - messageSpeed;

        if (messageX + p.textWidth(message) < 0) {
            // 文字列全体が左端を出たら、右端から再スタートする
            messageX = p.width;
        }
    };
};

new p5(sketch);
