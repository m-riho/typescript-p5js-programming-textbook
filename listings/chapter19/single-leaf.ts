// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // 落ち葉の中心のx座標
    let leafX: number = 200;
    // 落ち葉の中心のy座標
    let leafY: number = 40;
    // 落ち葉が下に動く速さ
    let leafSpeedY: number = 1.8;
    // 落ち葉が左右に揺れる大きさ
    let swingWidth: number = 28;
    // 落ち葉が揺れる速さ
    let swingSpeed: number = 0.04;

    p.setup = (): void => {
        p.createCanvas(500, 320);
        p.noStroke();
    };

    p.draw = (): void => {
        p.background(235, 245, 238);

        updateLeaf();
        displayLeaf();
    };

    function updateLeaf(): void {
        // 落ち葉を下に動かし、画面外に出たら上から戻す
        leafY = leafY + leafSpeedY;

        if (leafY > p.height + 20) {
            leafY = -20;
            leafX = p.random(40, p.width - 40);
        }
    }

    function displayLeaf(): void {
        // frameCountを使って、左右にゆれる表示位置を作る
        const swingX: number = p.sin(p.frameCount * swingSpeed) * swingWidth;
        const displayX: number = leafX + swingX;

        p.push();
        p.translate(displayX, leafY);
        p.rotate(p.sin(p.frameCount * 0.03) * 0.6);

        p.fill(194, 105, 48);
        p.ellipse(0, 0, 34, 18);

        p.stroke(120, 72, 32);
        p.line(-14, 0, 14, 0);
        p.noStroke();

        p.pop();
    }
};

new p5(sketch);
