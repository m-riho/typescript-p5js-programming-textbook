// p5.jsの機能を取り込む
import p5 from "p5";
class JitteringSquare {
    // 正方形の中心の x 座標
    centerX: number;
    // 正方形の中心の y 座標
    centerY: number;
    // 正方形の一辺の長さ
    sideLength: number;
    constructor(centerX: number, centerY: number, sideLength: number) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.sideLength = sideLength;
    }
    update(p: p5): void {
        // 点の例と同じ動きだが、ここにも同じ処理を書く必要がある
        this.centerX = this.centerX + p.random(-1, 1);
        this.centerY = this.centerY + p.random(-1, 1);
        this.centerX = p.constrain(this.centerX, 0, p.width);
        this.centerY = p.constrain(this.centerY, 0, p.height);
    }
    display(p: p5): void {
        p.rectMode(p.CENTER);
        p.fill(220, 60, 60);
        p.stroke(80);
        p.square(this.centerX, this.centerY, this.sideLength);
    }
}
const sketch = (p: p5): void => {
    // 画面中央から少しずつ動く正方形
    let square: JitteringSquare;
    p.setup = (): void => {
        p.createCanvas(300, 240);
        square = new JitteringSquare(p.width / 2, p.height / 2, 30);
    };
    p.draw = (): void => {
        p.background(245);
        square.update(p);
        square.display(p);
    };
};
new p5(sketch);
