// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // 読み込んだ画像
    // setup関数やdraw関数の中で使うので、大域変数として宣言しておく
    let picture: p5.Image;

    p.setup = async (): Promise<void> => {
        // 画像を読み込むのに時間がかかる場合があるので、
        // awaitを使って読み込む
        picture = await p.loadImage("images/sample.png");
        p.createCanvas(420, 260);
    };

    p.draw = (): void => {
        p.background(245);

        // 画像の縦横比を保ったまま表示するために、縦横比を計算する
        // picture.widthで画像の幅、
        // picture.heightで画像の高さを取得できる
        const ratio: number = picture.height / picture.width;

        // CORNERでは、指定した座標が画像の左上になる
        let displayWidth: number = 120;
        let displayHeight: number = displayWidth * ratio;
        p.imageMode(p.CORNER);
        p.image(picture, 30, 40, displayWidth, displayHeight);

        // 図形の塗りつぶしを無効にして、黒の円のみを絵描く
        p.noFill();
        p.stroke(20);

        // 画像の左上の位置を確認するための小さな円
        p.circle(30, 40, 16);

        // CENTERでは、指定した座標が画像の中心になる
        displayWidth = 160;
        displayHeight = displayWidth * ratio;
        p.imageMode(p.CENTER);
        p.image(picture, 300, 130, displayWidth, displayHeight);

        // 画像の中心位置を確認するための小さな円
        p.circle(300, 130, 16);
    };
};

new p5(sketch);
