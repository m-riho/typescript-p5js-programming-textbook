// p5.jsの機能を取り込む
import p5 from "p5";

// p5.jsの動作内容を定義する関数
const sketch = (myP5: p5): void => {
    // p5.jsの初期化処理
    myP5.setup = (): void => {
        myP5.createCanvas(400, 300);
    };
    // p5.jsの描画処理
    myP5.draw = (): void => {
        myP5.background(240);
        myP5.circle(200, 150, 80);
    };
};

// sketchを使ってp5.jsを開始する
new p5(sketch);
