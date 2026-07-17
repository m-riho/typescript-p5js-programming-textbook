// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // 長方形の中に表示する文字列
    const message: string = "TypeScript and p5.js";
    // 文字を表示する領域の左上の x 座標
    const boxX: number = 40;
    // 文字を表示する領域の左上の y 座標
    const boxY: number = 60;
    // 文字を表示する領域の幅
    const boxWidth: number = 320;
    // 文字を表示する領域の高さ
    const boxHeight: number = 100;

    p.setup = (): void => {
        p.createCanvas(400, 220);
        p.noLoop();
    };

    p.draw = (): void => {
        p.background(245);

        // 文字を配置する範囲を長方形で示す
        p.noFill();
        p.stroke(120);
        p.rect(boxX, boxY, boxWidth, boxHeight);

        // 長方形の中央に文字をそろえて表示する
        p.fill(40);
        p.noStroke();
        p.textSize(24);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(message, boxX, boxY, boxWidth, boxHeight);
    };
};

new p5(sketch);
