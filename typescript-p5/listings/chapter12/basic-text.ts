// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // 画面に表示する文字列
    const message: string = "Hello p5.js";

    p.setup = (): void => {
        p.createCanvas(400, 220);
        p.background(245);

        // 大きな文字でメインのメッセージを表示する
        p.fill(40);
        p.textSize(32);
        p.text(message, 40, 80);

        // 文字の大きさを変えると、同じtextでも見た目が変わる
        p.fill(80);
        p.textSize(16);
        p.text("文字の大きさを変えて表示できます", 40, 130);
    };
};

new p5(sketch);
