// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 長方形の回転角度
    let angle: number = 0;

    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        // キャンバスを作り、長方形を中心座標で描く設定にする
        p.createCanvas(400, 300);
        p.rectMode(p.CENTER);
    };

    // 何度も繰り返し実行される処理
    p.draw = (): void => {
        p.background(245);

        // 座標軸の原点をマウスの位置へ移動する
        p.translate(p.mouseX, p.mouseY);

        // 移動した座標軸を回転する
        p.rotate(angle);

        p.fill(120, 170, 230);
        p.stroke(40);
        p.rect(0, 0, 120, 50);

        // 次のフレームで少し回転させる
        angle = angle + p.PI / 180;
    };
};

new p5(sketch);
