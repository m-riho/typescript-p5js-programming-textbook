// p5.jsの機能を取り込む
import p5 from "p5";

// 風船を表すクラス
class Ballon {
    // 風船の中心座標
    private x: number;
    private y: number;
    // 1フレームで上へ進む距離
    private readonly verticalSpeed: number;
    // 表示に使う風船の画像
    private readonly image: p5.Image;
    // 画面に表示する風船の大きさ
    private readonly size: number = 80;

    constructor(
        x: number,
        y: number,
        verticalSpeed: number,
        image: p5.Image
    ) {
        this.x = x;
        this.y = y;
        this.verticalSpeed = verticalSpeed;
        this.image = image;
    }

    // 1フレーム分だけ風船の位置を上へ進める
    public move(): void {
        this.y -= this.verticalSpeed;
    }

    // 風船画像の中心を現在位置に合わせて表示する
    public draw(p: p5): void {
        p.image(this.image, this.x, this.y, this.size, this.size);
    }

    // 風船全体が画面の上へ出たらtrueを返す
    public isOffScreen(): boolean {
        return this.y < -this.size / 2;
    }

    // クリック位置が風船の四角い範囲内ならtrueを返す
    public isClicked(mouseX: number, mouseY: number): boolean {
        const halfSize: number = this.size / 2;
        return (
            Math.abs(mouseX - this.x) <= halfSize &&
            Math.abs(mouseY - this.y) <= halfSize
        );
    }
}

// クリックしやすいように、マウスカーソルの位置へ照準を表示する
function drawCrosshair(p: p5, x: number, y: number): void {
    const diameter: number = 60;
    p.noFill();
    p.stroke(0);
    p.strokeWeight(2);
    p.circle(x, y, diameter);
    p.circle(x, y, diameter / 3);
    p.line(x - diameter / 3, y, x + diameter / 3, y);
    p.line(x, y - diameter / 3, x, y + diameter / 3);
}

const sketch = (p: p5): void => {
    // 読み込んだ風船の画像
    let ballonImage: p5.Image;
    // 画面に表示している風船
    let ballons: Ballon[] = [];

    p.setup = async (): Promise<void> => {
        ballonImage = await p.loadImage("images/ballon.png");
        p.createCanvas(800, 800);
        p.imageMode(p.CENTER);

        // 最初の風船を画面の下に用意する
        const x: number = p.random(p.width);
        const y: number = p.height + 40;
        const verticalSpeed: number = p.random(0.5, 3.0);
        ballons.push(new Ballon(x, y, verticalSpeed, ballonImage));
    };

    p.draw = (): void => {
        p.background(240);

        // 画面の上まで移動した風船を配列から取り除く
        ballons = ballons.filter(
            (ballon: Ballon): boolean => !ballon.isOffScreen()
        );

        // 0.5%の確率で新しい風船を画面の下に追加する
        if (p.random(1) < 0.005) {
            const x: number = p.random(p.width);
            const y: number = p.height + 40;
            const verticalSpeed: number = p.random(0.5, 3.0);
            ballons.push(new Ballon(x, y, verticalSpeed, ballonImage));
        }

        for (const ballon of ballons) {
            ballon.move();
            ballon.draw(p);
        }

        drawCrosshair(p, p.mouseX, p.mouseY);
    };

    p.mousePressed = (): void => {
        // クリックした位置にある風船を配列から取り除く
        ballons = ballons.filter(
            (ballon: Ballon): boolean =>
                !ballon.isClicked(p.mouseX, p.mouseY)
        );
    };
};

new p5(sketch);
