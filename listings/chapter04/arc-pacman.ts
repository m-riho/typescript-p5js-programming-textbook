// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(420, 260);   // 作成するキャンバスの幅と高さを指定する
        p.background(20);           // キャンバスを暗い灰色で塗りつぶす

        // 円弧の中心の x 座標
        const arcCenterX: number = 210;

        // 円弧の中心の y 座標
        const arcCenterY: number = 130;

        // 円弧の幅
        const arcWidth: number = 180;

        // 円弧の高さ
        const arcHeight: number = 180;

        // 口の開き始めの角度
        const startAngle: number = p.QUARTER_PI;

        // 口の開き終わりの角度
        const endAngle: number = p.TWO_PI - p.QUARTER_PI;

        p.noStroke();               // 枠線を描かないようにする
        p.fill(255, 220, 40);       // 塗りつぶし色を黄色にする

        // 口が開いた円のような形を描く
        p.arc(
            arcCenterX,
            arcCenterY,
            arcWidth,
            arcHeight,
            startAngle,
            endAngle,
            p.PIE
        );

        p.fill(30);                 // 塗りつぶし色を暗い灰色にする
        p.circle(205, 80, 18);      // 目を描く
    };
};

new p5(sketch);
