// p5.jsの機能を取り込む
import p5 from "p5";

// p5.jsの動作内容を定義する関数
const sketch = (p: p5): void => {
    // p5.jsの初期化処理
    p.setup = (): void => {
        p.createCanvas(400, 300);
    };
    // p5.jsの描画処理
    p.draw = (): void => {
        p.background(240);
        p.circle(200, 150, 80);
    };
};

// sketchを使ってp5.jsを開始する
new p5(sketch);
