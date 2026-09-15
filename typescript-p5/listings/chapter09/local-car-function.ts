// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        // キャンバスを作り、長方形を中心座標で描く設定にする
        p.createCanvas(400, 280);
        p.rectMode(p.CENTER);
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        p.background(245);

        // 同じ関数を使い、位置と角度の違う車を描く
        drawCar(p, p.mouseX, p.mouseY, 0);
        drawCar(p, p.width / 2, p.height / 2, p.PI / 8);
    };
};

// 座標変換を使い、指定した位置と角度で車を描く
function drawCar(p: p5, carX: number, carY: number, angle: number): void {
    const carWidth: number = 120; // 車体の横幅
    const carHeight: number = 56; // 車体の高さ
    const tireWidth: number = 26; // タイヤの横幅
    const tireHeight: number = 14; // タイヤの高さ

    // この関数の中だけ座標軸を移動・回転する
    p.push();
    p.translate(carX, carY);
    p.rotate(angle);

    p.stroke(40);
    p.fill(160);
    p.rect(0, 0, carWidth, carHeight);

    p.fill(30);
    p.rect(-carWidth / 4, -carHeight / 2, tireWidth, tireHeight);
    p.rect(carWidth / 4, -carHeight / 2, tireWidth, tireHeight);
    p.rect(-carWidth / 4, carHeight / 2, tireWidth, tireHeight);
    p.rect(carWidth / 4, carHeight / 2, tireWidth, tireHeight);

    // 座標軸を関数を呼び出す前の状態に戻す
    p.pop();
}

new p5(sketch);
