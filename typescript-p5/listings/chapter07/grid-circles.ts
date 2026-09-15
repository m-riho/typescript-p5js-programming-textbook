// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        // キャンバスを作り、背景を黒に近い色で塗る
        p.createCanvas(400, 240);
        p.background(20);

        const circleSpacing: number = 40; // 円の間隔
        const circleDiameter: number = 28; // 円の直径
        const numberOfColumns: number = 9; // 横方向に並べる個数
        const numberOfRows: number = 5; // 縦方向に並べる個数

        p.noStroke();
        p.fill(255);

        // 列と行を組み合わせて、円を格子状に並べる
        for (let column: number = 0; column < numberOfColumns; column++) {
            for (let row: number = 0; row < numberOfRows; row++) {
                const circleX: number = 40 + circleSpacing * column;
                const circleY: number = 40 + circleSpacing * row;

                p.circle(circleX, circleY, circleDiameter);
            }
        }
    };
};

new p5(sketch);
