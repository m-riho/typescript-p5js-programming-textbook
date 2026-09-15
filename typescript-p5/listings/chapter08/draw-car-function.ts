// p5.jsの機能を取り込む
import p5 from "p5";

// 車を描くための処理を1つの部品にまとめる
function drawCar(
    p: p5,
    carX: number,
    carY: number
): void {
    const carWidth: number = 120; // 車体の幅
    const carHeight: number = 50; // 車体の高さ
    const tireDiameter: number = 24; // タイヤの直径

    // carX, carY を車体の中心として描く
    p.rectMode(p.CENTER);
    p.stroke(40);

    // 車体を描く
    p.fill(160);
    p.rect(carX, carY, carWidth, carHeight);

    // 左右のタイヤを描く
    p.fill(40);
    p.circle(carX - carWidth / 3, carY + carHeight / 2, tireDiameter);
    p.circle(carX + carWidth / 3, carY + carHeight / 2, tireDiameter);
}

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        // キャンバスを作る
        p.createCanvas(420, 220);
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        // 背景を明るい灰色で塗り直す
        p.background(245);

        // 同じ関数を使い、違う位置に車を描く
        drawCar(p, p.mouseX, p.mouseY);
        drawCar(p, p.width / 2, p.height / 2);
    };
};

new p5(sketch);
