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

        // キャンバスを3等分したときの幅
        const areaWidth: number = p.width / 3;

        // 図形の枠線を描かない
        p.noStroke();

        // マウスがどの範囲にあるかで、塗る場所を変える
        if (p.mouseX < areaWidth) {
            // 左の範囲を青色で塗る
            p.fill(80, 140, 240);
            p.rect(0, 0, areaWidth, p.height);
        } else if (p.mouseX < areaWidth * 2) {
            // 中央の範囲を緑色で塗る
            p.fill(120, 210, 170);
            p.rect(areaWidth, 0, areaWidth, p.height);
        } else {
            // 右の範囲をオレンジ色で塗る
            p.fill(240, 160, 90);
            p.rect(areaWidth * 2, 0, areaWidth, p.height);
        }
    };
};

new p5(sketch);
