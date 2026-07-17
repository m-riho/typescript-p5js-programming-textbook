// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    let circleX: number = 80;        // 円の中心の x 座標
    const circleY: number = 120;     // 円の中心の y 座標
    const circleRadius: number = 30; // 円の半径
    let circleSpeed: number = 3;     // 1回のdrawで円が横に進む量

    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        // キャンバスを作る
        p.createCanvas(400, 240);
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        p.background(245);

        // 現在の位置に円を描く
        p.fill(120, 180, 240);
        p.circle(circleX, circleY, circleRadius * 2);

        // 円の x 座標を更新する
        circleX = circleX + circleSpeed;

        // 右端に着いたら左向きにする
        if (circleX + circleRadius >= p.width) {
            circleSpeed = -3;
        }

        // 左端に着いたら右向きにする
        if (circleX - circleRadius <= 0) {
            circleSpeed = 3;
        }
    };
};

new p5(sketch);
