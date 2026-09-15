// p5.jsの機能を取り込む
import p5 from "p5";

class FallingSquare {
    // 正方形の中心の x 座標
    centerX: number;
    // 正方形の中心の y 座標
    centerY: number;
    // 正方形の一辺の長さ
    size: number;
    // 正方形の下向きの速さ
    speedY: number;
    // 正方形の色
    color: p5.Color;

    constructor(p: p5) {
        // 新しいFallingSquareを作るたびに、少し違う初期状態にする
        this.size = p.random(12, 28);
        this.centerX = p.random(this.size / 2, p.width - this.size / 2);
        this.centerY = p.random(-p.height, -this.size / 2);
        this.speedY = p.random(1, 3);
        this.color = p.color(p.random(360), 60, 90);
    }

    update(p: p5): void {
        // 自分自身の y 座標を更新する
        this.centerY = this.centerY + this.speedY;

        if (this.centerY - this.size / 2 > p.height) {
            // 画面の下へ出たら、新しい位置と速さで上に戻す
            this.centerX = p.random(this.size / 2, p.width - this.size / 2);
            this.centerY = -this.size / 2;
            this.speedY = p.random(1, 3);
        }
    }

    display(p: p5): void {
        // 自分自身が持っている値を使って正方形を描く
        p.rectMode(p.CENTER);
        p.fill(this.color);
        p.stroke(40);
        p.square(this.centerX, this.centerY, this.size);
    }
}

const sketch = (p: p5): void => {
    // 正方形の個数
    const numberOfSquares: number = 24;
    // 画面に表示する正方形の配列
    const squares: FallingSquare[] = [];

    p.setup = (): void => {
        p.createCanvas(360, 400);
        p.colorMode(p.HSB, 360, 100, 100);

        // 配列にFallingSquareのインスタンスを順番に入れる
        for (let index: number = 0; index < numberOfSquares; index++) {
            squares[index] = new FallingSquare(p);
        }
    };

    p.draw = (): void => {
        p.background(0, 0, 96);

        // 配列に入っている正方形を1つずつ更新して描く
        for (let index: number = 0; index < squares.length; index++) {
            squares[index].update(p);
            squares[index].display(p);
        }
    };
};

new p5(sketch);
