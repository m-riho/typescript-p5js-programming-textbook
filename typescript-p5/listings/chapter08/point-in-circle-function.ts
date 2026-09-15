// p5.jsの機能を取り込む
import p5 from "p5";

const circleX: number = 180; // 円の中心の x 座標
const circleY: number = 180; // 円の中心の y 座標
const circleRadius: number = 120; // 円の半径

// 指定した点が円の内側にあるかを調べる
function isInsideCircle(p: p5, pointX: number, pointY: number): boolean {
    // 点と円の中心の距離
    const distanceFromCenter: number =
        p.dist(pointX, pointY, circleX, circleY);

    return distanceFromCenter <= circleRadius;
}

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        // キャンバスを作る
        p.createCanvas(360, 360);
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        // 背景を明るい灰色で塗り直す
        p.background(245);

        // マウスが円の中にあるか
        const mouseIsInsideCircle: boolean =
            isInsideCircle(p, p.mouseX, p.mouseY);

        if (mouseIsInsideCircle) {
            p.fill(240, 80, 80);
        } else {
            p.fill(80, 120, 240);
        }

        // 判定結果に応じた色で円を描く
        p.noStroke();
        p.circle(circleX, circleY, circleRadius * 2);
    };
};

new p5(sketch);
