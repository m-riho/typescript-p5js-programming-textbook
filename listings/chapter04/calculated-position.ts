// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(480, 180);   // 作成するキャンバスの幅と高さを指定する
        p.background(250);          // キャンバスを明るい灰色で塗りつぶす

        // 左の円の中心の x 座標
        const leftCircleX: number = 120;

        // 円どうしの間隔
        const circleSpacing: number = 120;

        // 円の中心の y 座標
        const circleY: number = 90;

        // 円の直径
        const circleDiameter: number = 70;

        p.fill(120, 220, 170);      // 塗りつぶし色を緑にする
        p.circle(leftCircleX, circleY, circleDiameter);  // 左の円を描く
        // 間隔を1つ分足した位置に中央の円を描く
        p.circle(
            leftCircleX + circleSpacing,
            circleY,
            circleDiameter
        );

        // 間隔を2つ分足した位置に右の円を描く
        p.circle(
            leftCircleX + circleSpacing * 2,
            circleY,
            circleDiameter
        );
    };
};

new p5(sketch);
