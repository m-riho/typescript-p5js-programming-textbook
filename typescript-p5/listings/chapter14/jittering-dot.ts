// p5.jsの機能を取り込む
import p5 from "p5";

class JitteringDot {
    // 点の x 座標
    centerX: number;
    // 点の y 座標
    centerY: number;

    constructor(centerX: number, centerY: number) {
        // 引数で受け取った位置を、点の最初の位置にする
        this.centerX = centerX;
        this.centerY = centerY;
    }

    update(p: p5): void {
        // ランダムに少しだけ位置をずらす
        this.centerX = this.centerX + p.random(-1, 1);
        this.centerY = this.centerY + p.random(-1, 1);

        // 画面の外へ出ないようにする
        this.centerX = p.constrain(this.centerX, 0, p.width);
        this.centerY = p.constrain(this.centerY, 0, p.height);
    }

    display(p: p5): void {
        p.stroke(220, 60, 60);
        p.strokeWeight(5);
        p.point(this.centerX, this.centerY);
    }
}

const sketch = (p: p5): void => {
    // 画面中央から少しずつ動く点
    let dot: JitteringDot;

    p.setup = (): void => {
        p.createCanvas(300, 240);
        dot = new JitteringDot(p.width / 2, p.height / 2);
    };

    p.draw = (): void => {
        p.background(245);
        // 位置を更新してから、現在の位置に描く
        dot.update(p);
        dot.display(p);
    };
};

new p5(sketch);
