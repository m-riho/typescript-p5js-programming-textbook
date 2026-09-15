// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    let characterX: number = 60;    // キャラクターの中心の x 座標
    const characterY: number = 120; // キャラクターの中心の y 座標
    const characterWidth: number = 70;   // キャラクターの幅
    const characterHeight: number = 70;  // キャラクターの高さ
    const characterSpeed: number = 2;    // 1回のdrawで右に進む量
    const mouthStartAngle: number = p.QUARTER_PI;  // 口の開き始めの角度
    const mouthEndAngle: number = p.TWO_PI - p.QUARTER_PI;  // 口の開き終わりの角度

    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        p.createCanvas(400, 240);   // 作成するキャンバスの幅と高さを指定する
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        p.background(20);           // キャンバスを暗い灰色で塗りつぶす

        p.noStroke();               // 枠線を描かないようにする
        p.fill(255, 220, 40);       // 塗りつぶし色を黄色にする

        // 口が開いた円のような形を描く
        p.arc(
            characterX,
            characterY,
            characterWidth,
            characterHeight,
            mouthStartAngle,
            mouthEndAngle,
            p.PIE
        );

        characterX = characterX + characterSpeed;  // 次のdrawで描く位置を右に動かす
    };
};

new p5(sketch);
