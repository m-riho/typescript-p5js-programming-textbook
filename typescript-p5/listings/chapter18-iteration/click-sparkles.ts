// p5.jsの機能を取り込む
import p5 from "p5";

class Sparkle {
    // 光の中心x座標
    x: number;

    // 光の中心y座標
    y: number;

    // 光の大きさ
    size: number;

    // 透明度
    alpha: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = 8;
        this.alpha = 255;
    }

    update(): void {
        // 時間が進むと光が広がり、少しずつ消えていく
        this.size = this.size + 0.8;
        this.alpha = this.alpha - 4;
    }

    display(p: p5): void {
        p.noStroke();
        p.fill(255, 220, 80, this.alpha);
        p.circle(this.x, this.y, this.size);
    }
}

const sketch = (p: p5): void => {
    // 画面に出ている光のリスト
    const sparkles: Sparkle[] = [];

    // 画面に残す光の最大数
    const maxSparkleCount: number = 25;

    p.setup = (): void => {
        p.createCanvas(480, 300);
    };

    p.draw = (): void => {
        p.background(30, 40, 55);

        for (const sparkle of sparkles) {
            // 配列に入っている光を、すべて同じ手順で更新する
            sparkle.update();
            sparkle.display(p);
        }

        p.fill(255);
        p.textSize(16);
        p.text("sparkles: " + sparkles.length, 20, 30);
    };

    p.mousePressed = (): void => {
        // クリックした場所に新しい光を追加する
        sparkles.push(new Sparkle(p.mouseX, p.mouseY));

        if (sparkles.length > maxSparkleCount) {
            // 古い光を先頭から消す
            sparkles.shift();
        }
    };
};

new p5(sketch);
