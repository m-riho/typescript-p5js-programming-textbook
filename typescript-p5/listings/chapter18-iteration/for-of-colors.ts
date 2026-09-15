// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // 円に使う色のリスト
    const circleColors: string[] = [
        "red",
        "green",
        "blue",
        "yellow"
    ];

    p.setup = (): void => {
        p.createCanvas(420, 160);
        p.noLoop();
    };

    p.draw = (): void => {
        p.background(245);

        // 次に描く円のx座標
        let circleX: number = 70;

        for (const circleColor of circleColors) {
            // 配列の中の色を1つずつ使って円を描く
            p.fill(circleColor);
            p.circle(circleX, 80, 60);
            circleX = circleX + 90;
        }
    };
};

new p5(sketch);
