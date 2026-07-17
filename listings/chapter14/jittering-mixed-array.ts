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
        // 親クラスの位置情報を初期化する
        super(centerX, centerY);
        this.sideLength = sideLength;
    }

    display(p: p5): void {
        // 親クラスと同じ位置を使い、正方形として描く
        p.rectMode(p.CENTER);
        p.fill(80, 150, 230);
        p.stroke(60);
        p.strokeWeight(1);
        p.square(this.centerX, this.centerY, this.sideLength);
    }
}

const sketch = (p: p5): void => {
    // 点と正方形をまとめて入れる配列
    const things: JitteringDot[] = [];

    p.setup = (): void => {
        p.createCanvas(360, 260);

        // 親クラスの型の配列に、子クラスのインスタンスも入れられる
        things[0] = new JitteringDot(90, 120);
        things[1] = new JitteringSquare(180, 120, 36);
        things[2] = new JitteringDot(270, 120);
    };

    p.draw = (): void => {
        p.background(245);

        // 実際のクラスに応じたdisplayが呼び出される
        for (let index: number = 0; index < things.length; index++) {
            things[index].update(p);
            things[index].display(p);
        }
    };
};

new p5(sketch);
