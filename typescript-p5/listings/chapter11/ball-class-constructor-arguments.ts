// p5.jsの機能を取り込む
import p5 from "p5";

class Ball {
    // 円の中心の x 座標
    centerX: number;
    // 円の中心の y 座標
    centerY: number;
    // 円の半径
    radius: number;
    // 円の下向きの速さ
    speedY: number;
    // 円の色
    color: p5.Color;

    constructor(
        p: p5,
        centerX: number,
        radius: number,
        hue: number
    ) {
        // 引数で受け取った値を、このBallの初期状態にする
        this.centerX = centerX;
        this.centerY = -radius;
        this.radius = radius;
        this.speedY = p.random(1, 3);
        this.color = p.color(hue, 70, 90);
    }

    update(p: p5): void {
        // 自分自身の y 座標を更新する
        this.centerY = this.centerY + this.speedY;

        if (this.centerY - this.radius > p.height) {
            // 画面の下へ出たら、同じ x 座標のまま上に戻す
            this.centerY = -this.radius;
        }
    }

    display(p: p5): void {
        // 自分自身が持っている値を使って円を描く
        p.fill(this.color);
        p.stroke(40);
        p.circle(this.centerX, this.centerY, this.radius * 2);
    }
}

const sketch = (p: p5): void => {
    // 画面に表示する円の配列
    const balls: Ball[] = [];

    p.setup = (): void => {
        p.createCanvas(360, 360);
        p.colorMode(p.HSB, 360, 100, 100);

        // 引数を変えることで、違う見た目のBallを作る
        balls[0] = new Ball(p, 90, 16, 20);
        balls[1] = new Ball(p, 180, 24, 200);
        balls[2] = new Ball(p, 270, 12, 300);
    };

    p.draw = (): void => {
        p.background(0, 0, 96);

        // 配列に入っているBallを1つずつ更新して描く
        for (let index: number = 0; index < balls.length; index++) {
            balls[index].update(p);
            balls[index].display(p);
        }
    };
};

new p5(sketch);
