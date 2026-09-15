// p5.jsの機能を取り込む
import p5 from "p5";

class JitteringDot {
    // 点の x 座標
    centerX: number;
    // 点の y 座標
    centerY: number;

    constructor(centerX: number, centerY: number) {
        this.centerX = centerX;
        this.centerY = centerY;
    }

    update(p: p5): void {
        this.centerX = this.centerX + p.random(-1, 1);
        this.centerY = this.centerY + p.random(-1, 1);

        this.centerX = p.constrain(this.centerX, 0, p.width);
        this.centerY = p.constrain(this.centerY, 0, p.height);
    }

    display(p: p5): void {
        p.stroke(220, 60, 60);
        p.strokeWeight(5);
        p.point(this.centerX, this.centerY);
    }
}

class JitteringSquare extends JitteringDot {
    // 正方形の一辺の長さ
    sideLength: number;

    constructor(centerX: number, centerY: number, sideLength: number) {
        // JitteringDotが持つ位置の初期化を呼び出す
        super(centerX, centerY);
        this.sideLength = sideLength;
    }

    display(p: p5): void {
        // updateは親クラスのものを使い、描き方だけを変える
        p.rectMode(p.CENTER);
        p.fill(220, 60, 60);
        p.stroke(80);
        p.strokeWeight(1);
        p.square(this.centerX, this.centerY, this.sideLength);
    }
}

const sketch = (p: p5): void => {
    // JitteringDotをもとに作った正方形
    let square: JitteringSquare;

    p.setup = (): void => {
        p.createCanvas(300, 240);
        square = new JitteringSquare(p.width / 2, p.height / 2, 30);
    };

    p.draw = (): void => {
        p.background(245);
        // updateは親クラスから引き継いだメソッド
        square.update(p);
        square.display(p);
    };
};

new p5(sketch);
