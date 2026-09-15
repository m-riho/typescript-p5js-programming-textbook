// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // 読み込んだ画像
    // setup関数やdraw関数の中で使うので、大域変数として宣言しておく
    let picture: p5.Image;

    // 画像を読み込むのに時間がかかる場合があるので、awaitとPromiseを使う
    p.setup = async (): Promise<void> => {
        // 画像を読み込むのに時間がかかる場合があるので、awaitを使って読み込む
        picture = await p.loadImage("images/sample.png");
        p.createCanvas(400, 260);
    };

    p.draw = (): void => {
        p.background(245);
        // 画像の左上を(40, 40)に合わせて表示する
        p.image(picture, 40, 40);
    };
};

new p5(sketch);
