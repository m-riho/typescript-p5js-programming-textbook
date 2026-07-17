// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // 表示する画像
    // setup関数やdraw関数の中で使うので、大域変数として宣言しておく
    let picture: p5.Image;
    // 画像に添える説明文
    const caption: string = "My favorite actress";

    // 画像を読み込むのに時間がかかる場合があるので、awaitとPromiseを使う
    p.setup = async (): Promise<void> => {
        // 画像を読み込むのに時間がかかる場合があるので、awaitを使って読み込む
        picture = await p.loadImage("images/sample.png");
        // キャンバスを作る
        p.createCanvas(420, 320);
    };

    p.draw = (): void => {
        p.background(245);

        // カードの本体として画像を表示する
        p.imageMode(p.CORNER);
        // 画像の縦横比を保ったまま、幅300ピクセルで表示する
        const ratio: number = picture.height / picture.width;
        const displayWidth: number = 300;
        const displayHeight: number = displayWidth * ratio;
        p.image(picture, 60, 40, displayWidth, displayHeight);

        // 説明文を読みやすくするための半透明の帯
        p.fill(255, 230);
        p.noStroke();
        p.rect(60, 210, 300, 30);

        // 帯の中央に説明文を表示する
        p.fill(40);
        p.textSize(16);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(caption, 60, 210, 300, 30);
    };
};

new p5(sketch);
