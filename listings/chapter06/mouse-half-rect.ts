// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        // キャンバスを作る
        p.createCanvas(400, 240);
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        // 背景を明るい灰色で塗り直す
        p.background(245);

        // 図形の枠線を描かない
        p.noStroke();

        // 左半分の初期表示を灰色にする
        p.fill(210);
        p.rect(0, 0, p.width / 2, p.height);

        // マウスが左半分にあるかどうかで色を変える
        if (p.mouseX < p.width / 2) {
            // 左半分を青色で塗る
            p.fill(80, 140, 240);
            p.rect(0, 0, p.width / 2, p.height);
        } else {
            // 右半分をオレンジ色で塗る
            p.fill(240, 160, 90);
            p.rect(p.width / 2, 0, p.width / 2, p.height);
        }
    };
};

new p5(sketch);
