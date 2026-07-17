// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // マウスの位置に表示する画像
    // setup関数やdraw関数の中で使うので、大域変数として宣言しておく
    let picture: p5.Image;

    // 画像を読み込むのに時間がかかる場合があるので、awaitとPromiseを使う
    p.setup = async (): Promise<void> => {
        // 画像を読み込むのに時間がかかる場合があるので、awaitを使う
        picture = await p.loadImage("images/sample.png");
        p.createCanvas(420, 280);
        p.imageMode(p.CENTER);
    };

    p.draw = (): void => {
        p.background(245);

        // 画像の縦横比を保ったまま表示するために、縦横比を計算する
        const ratio: number = picture.height / picture.width;
        const displayWidth: number = 160;
        const displayHeight: number = displayWidth * ratio;
        // マウスを押している間だけ、画像を大きく表示する
        if (p.mouseIsPressed) {
            p.image(picture, p.mouseX, p.mouseY, displayWidth, displayHeight);
        } else {
            // マウスを押していないときは、画像を小さく表示する
            p.image(picture, p.mouseX, p.mouseY, displayWidth / 2, displayHeight / 2);
        }
    };
};

new p5(sketch);
