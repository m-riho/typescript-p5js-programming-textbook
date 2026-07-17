// p5.jsの機能を取り込む
import p5 from "p5";

class FallingLeaf {
    // 落ち葉の基準になるx座標
    centerX: number;
    // 落ち葉の中心のy座標
    centerY: number;
    // 落ち葉が下に動く速さ
    speedY: number;
    // 左右に揺れる大きさ
    swingWidth: number;
    // 左右に揺れる速さ
    swingSpeed: number;
    // 落ち葉の色
    leafColor: p5.Color;

    constructor(p: p5, centerX: number, centerY: number) {
        this.centerX = centerX;
        this.centerY = centerY;
        // 個体ごとに少し違う落ち方にする
        this.speedY = p.random(1.0, 2.2);
        this.swingWidth = p.random(15, 35);
        this.swingSpeed = p.random(0.025, 0.055);
        this.leafColor = p.color(
            p.random(160, 220),
            p.random(80, 130),
            p.random(35, 70)
        );
    }

    update(p: p5): void {
        // 自分自身の位置を更新する
        this.centerY = this.centerY + this.speedY;

        if (this.centerY > p.height + 20) {
            this.centerY = -20;
            this.centerX = p.random(30, p.width - 30);
        }
    }

    display(p: p5): void {
        // centerXを基準に、時間に応じて左右へゆらす
        const swingX: number =
            p.sin(p.frameCount * this.swingSpeed) * this.swingWidth;
        const displayX: number = this.centerX + swingX;

        p.push();
        p.translate(displayX, this.centerY);
        p.rotate(p.sin(p.frameCount * 0.03) * 0.6);
        p.fill(this.leafColor);
        p.noStroke();
        p.ellipse(0, 0, 34, 18);
        p.stroke(120, 72, 32);
        p.line(-14, 0, 14, 0);
        p.pop();
    }
}

const sketch = (p: p5): void => {
    // 画面に降ってくる落ち葉
    const leaf: FallingLeaf = new FallingLeaf(p, 240, 40);

    p.setup = (): void => {
        p.createCanvas(500, 320);
    };

    p.draw = (): void => {
        p.background(235, 245, 238);
        leaf.update(p);
        leaf.display(p);
    };
};

new p5(sketch);
