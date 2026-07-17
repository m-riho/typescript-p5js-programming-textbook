// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(480, 180);   // 作成するキャンバスの幅と高さを指定する
        p.background(250);          // キャンバスを明るい灰色で塗りつぶす

        // 円の中心の x 座標
        let circleX: number = 100;

        // 円の中心の y 座標
        const circleY: number = 90;

        // 円の直径
        const circleDiameter: number = 70;

        p.fill(255, 180, 90);       // 塗りつぶし色をオレンジにする
        p.circle(circleX, circleY, circleDiameter);  // 1つ目の円を描く

        circleX = 240;              // 円の中心の x 座標を変更する
        p.circle(circleX, circleY, circleDiameter);  // 2つ目の円を描く

        circleX = 380;              // 円の中心の x 座標をもう一度変更する
        p.circle(circleX, circleY, circleDiameter);  // 3つ目の円を描く
    };
};

new p5(sketch);
