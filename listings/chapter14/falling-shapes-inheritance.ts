// p5.jsの機能を取り込む
import p5 from "p5";

class FallingShape {
    // 図形の中心の x 座標
    centerX: number;
    // 図形の中心の y 座標
    centerY: number;
    // 図形の大きさ
    size: number;
    // 図形の下向きの速さ
    speedY: number;
    // 図形の色
    color: p5.Color;

    constructor(p: p5) {
        // 円と正方形に共通する状態をここで初期化する
        this.size = p.random(16, 34);
        this.centerX = p.random(this.size, p.width - this.size);
        this.centerY = p.random(-p.height, -this.size);
        this.speedY = p.random(1, 3);
        this.color = p.color(p.random(360), 70, 90);
    }

    update(p: p5): void {
        // 図形の種類に関係なく、下へ落ちる動きは共通にする
        this.centerY = this.centerY + this.speedY;

        if (this.centerY - this.size > p.height) {
            // 画面の下へ出たら、上からもう一度落とす
            this.centerX = p.random(this.size, p.width - this.size);
            this.centerY = -this.size;
            this.speedY = p.random(1, 3);
        }
    }

    display(p: p5): void {
        p.fill(this.color);
        p.stroke(40);
        p.circle(this.centerX, this.centerY, this.size);
    }
}

class FallingCircle extends FallingShape {
    display(p: p5): void {
        // 共通の状態を使って円として描く
        p.fill(this.color);
        p.stroke(40);
        p.circle(this.centerX, this.centerY, this.size);
    }
}

class FallingSquare extends FallingShape {
    display(p: p5): void {
        // 共通の状態を使って正方形として描く
        p.rectMode(p.CENTER);
        p.fill(this.color);
        p.stroke(40);
        p.square(this.centerX, this.centerY, this.size);
    }
}

const sketch = (p: p5): void => {
    // 落ちてくる図形の個数
    const numberOfShapes: number = 24;
    // 円と正方形をまとめて入れる配列
    const shapes: FallingShape[] = [];

    p.setup = (): void => {
        p.createCanvas(360, 400);
        p.colorMode(p.HSB, 360, 100, 100);

        // 前半は円、後半は正方形のインスタンスを作る
        for (let index: number = 0; index < numberOfShapes; index++) {
            if (index < numberOfShapes / 2) {
                shapes[index] = new FallingCircle(p);
            } else {
                shapes[index] = new FallingSquare(p);
            }
        }
    };

    p.draw = (): void => {
        p.background(0, 0, 96);

        // FallingShape型として扱い、共通の手順で更新して描く
        for (let index: number = 0; index < shapes.length; index++) {
            shapes[index].update(p);
            shapes[index].display(p);
        }
    };
};

new p5(sketch);
