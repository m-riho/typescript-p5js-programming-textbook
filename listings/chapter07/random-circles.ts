// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        // キャンバスを作り、背景を灰色で塗る
        p.createCanvas(400, 240);
        p.background(150);

        const circleDiameter: number = 20; // 円の直径
        const numberOfCircles: number = 30; // 描く円の個数

        p.noStroke();
        p.fill(255);

        // 指定した個数だけ、ランダムな位置に円を描く
        for (let count: number = 0; count < numberOfCircles; count++) {
            const circleX: number = p.random(p.width); // 円の中心の x 座標
            const circleY: number = p.random(p.height); // 円の中心の y 座標

            p.circle(circleX, circleY, circleDiameter);
        }
    };
};

new p5(sketch);
