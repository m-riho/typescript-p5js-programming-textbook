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

    constructor(p: p5) {
        // 新しいBallを作るときに、最初の状態を決める
        this.radius = p.random(12, 24);
        this.centerX = p.random(this.radius, p.width - this.radius);
        this.centerY = -this.radius;
        this.speedY = p.random(1, 3);
        this.color = p.color(p.random(360), 70, 90);
    }

    update(p: p5): void {
        // 自分自身の y 座標を更新する
        this.centerY = this.centerY + this.speedY;

        if (this.centerY - this.radius > p.height) {
            // 画面の下へ出たら、新しい位置と速さで上に戻す
            this.centerX = p.random(this.radius, p.width - this.radius);
            this.centerY = -this.radius;
            this.speedY = p.random(1, 3);
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
    // 画面に表示する1つの円
    let ball: Ball;

    p.setup = (): void => {
        p.createCanvas(300, 360);
        p.colorMode(p.HSB, 360, 100, 100);
        ball = new Ball(p);
    };

    p.draw = (): void => {
        p.background(0, 0, 96);
        // Ballの中に用意した命令を呼び出す
        ball.update(p);
        ball.display(p);
    };
};

new p5(sketch);
