// p5.js の機能を取り込む
import p5 from "p5";

// p5.js の動作内容を定義する関数
const sketch = (p: p5): void => {
    // p5.js の初期化処理
    p.setup = (): void => {
        p.createCanvas(400, 300);
    };
    // p5.js の描画処理
    p.draw = (): void => {
        p.background(240);
        p.circle(200, 150, 80);
    };
};
// sketch を使って p5.js を開始する
new p5(sketch);