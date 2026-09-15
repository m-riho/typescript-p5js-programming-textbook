// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(420, 220);   // 作成するキャンバスの幅と高さを指定する
        p.background(250);          // キャンバスを明るい灰色で塗りつぶす

        // 楕円の中心の x 座標
        const circleX: number = 210;

        // 楕円の中心の y 座標
        const circleY: number = 110;

        // 楕円の幅
        const circleWidth: number = 160.5;

        // 楕円の高さ
        const circleHeight: number = 90.5;

        p.fill(240, 160, 180);      // 塗りつぶし色をピンクにする

        // 小数を含む幅と高さで楕円を描く
        p.ellipse(
            circleX,        // 楕円の中心の x 座標
            circleY,        // 楕円の中心の y 座標
            circleWidth,    // 楕円の幅
            circleHeight    // 楕円の高さ
        );
    };
};

new p5(sketch);
