// p5.jsの機能を取り込む
import p5 from "p5";

class ClickableShape {
    // 図形の中心の x 座標
    centerX: number;
    // 図形の中心の y 座標
    centerY: number;
    // 図形の大きさ
    size: number;
    // 図形の色
    color: p5.Color;

    constructor(p: p5, centerX: number, centerY: number) {
        // クリック判定に必要な共通の状態を初期化する
        this.centerX = centerX;
        this.centerY = centerY;
        this.size = 40;
        this.color = p.color(210, 70, 90);
    }

    isMouseOver(p: p5): boolean {
        // マウスと図形の中心との距離
        const distanceFromMouse: number = p.dist(
            p.mouseX,
            p.mouseY,
            this.centerX,
            this.centerY
        );

        return distanceFromMouse < this.size / 2;
    }

    display(p: p5): void {
        p.fill(this.color);
        p.stroke(40);
        p.circle(this.centerX, this.centerY, this.size);
    }
}

class ClickableSquare extends ClickableShape {
    display(p: p5): void {
        // クリック判定は親クラスのまま、描き方だけを変える
        p.rectMode(p.CENTER);
        p.fill(this.color);
        p.stroke(40);
        p.square(this.centerX, this.centerY, this.size);
    }
}

const sketch = (p: p5): void => {
    // マウスに反応する図形の配列
    const shapes: ClickableShape[] = [];

    p.setup = (): void => {
        p.createCanvas(360, 220);
        p.colorMode(p.HSB, 360, 100, 100);
        // 同じ配列に、親クラスと子クラスのインスタンスを入れる
        shapes[0] = new ClickableShape(p, 120, 110);
        shapes[1] = new ClickableSquare(p, 240, 110);
    };

    p.draw = (): void => {
        p.background(0, 0, 96);

        // マウスが重なっているかどうかで色を変える
        for (let index: number = 0; index < shapes.length; index++) {
            if (shapes[index].isMouseOver(p)) {
                shapes[index].color = p.color(20, 80, 95);
            } else {
                shapes[index].color = p.color(210, 70, 90);
            }

            shapes[index].display(p);
        }
    };
};

new p5(sketch);
