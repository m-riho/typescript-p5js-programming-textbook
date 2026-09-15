// p5.jsの機能を取り込む
import p5 from "p5";

let carX: number = 0; // 車の中心の x 座標

// 指定した中心座標に車を描く
function drawCar(p: p5, carCenterX: number, carCenterY: number): void {
    // carCenterX, carCenterY を車体の中心として描く
    p.rectMode(p.CENTER);
    p.stroke(40);

    p.fill(160);
    p.rect(carCenterX, carCenterY, 120, 50);

    p.fill(40);
    p.circle(carCenterX - 40, carCenterY + 25, 24);
    p.circle(carCenterX + 40, carCenterY + 25, 24);
}

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(420, 240);
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        p.background(245);

        // 同じ関数を使い、2台の車を描く
        drawCar(p, carX, p.height / 3);
        drawCar(p, carX * 2, (p.height * 2) / 3);

        // 車を右へ動かす
        carX = carX + 1;

        if (carX > p.width) {
            carX = 0;
        }
    };
};

new p5(sketch);
