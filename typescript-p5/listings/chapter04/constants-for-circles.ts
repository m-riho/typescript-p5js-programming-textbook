// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(480, 180);   // 作成するキャンバスの幅と高さを指定する
        p.background(250);          // キャンバスを明るい灰色で塗りつぶす

        // 円の中心の y 座標
        const circleY: number = 90;

        // 円の直径
        const circleDiameter: number = 80;

        p.fill(120, 180, 240);      // 塗りつぶし色を青にする
        p.circle(120, circleY, circleDiameter);  // 左の円を描く
        p.circle(240, circleY, circleDiameter);  // 中央の円を描く
        p.circle(360, circleY, circleDiameter);  // 右の円を描く
    };
};

new p5(sketch);
