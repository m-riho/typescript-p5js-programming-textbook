// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(400, 400);
        p.rectMode(p.CENTER);

        // 静止画なので draw を1回だけ実行する
        p.noLoop();
    };

    // 1回だけ実行される描画処理
    p.draw = (): void => {
        p.background(250);

        // 時計の中心を座標軸の原点にする
        p.translate(p.width / 2, p.height / 2);

        // 12個の目盛りを30度ずつ回転させながら描く
        for (let markNumber: number = 0; markNumber < 12; markNumber++) {
            p.push();
            p.rotate(p.radians(markNumber * 30));

            // 回転した座標軸の上方向へ移動する
            p.translate(0, -145);

            p.fill(40);
            p.noStroke();
            p.rect(0, 0, 10, 28);

            p.pop();
        }
    };
};

new p5(sketch);
