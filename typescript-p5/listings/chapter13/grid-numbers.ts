// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // 表のように並べる数値
    const numbers: number[][] = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12]
    ];
    // 1つのマスの大きさ
    const cellSize: number = 60;

    p.setup = (): void => {
        p.createCanvas(260, 220);
        p.noLoop();
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(20);
    };

    p.draw = (): void => {
        p.background(245);

        // rowが行、columnが列を表す
        for (let row: number = 0; row < numbers.length; row++) {
            for (let column: number = 0; column < numbers[row].length; column++) {
                // 配列の位置を、画面上の座標に変換する
                const x: number = 20 + column * cellSize;
                const y: number = 20 + row * cellSize;

                // 1つのマスを描く
                p.fill(255);
                p.stroke(80);
                p.rect(x, y, cellSize, cellSize);

                // numbers[row][column]の値を、そのマスの中央に表示する
                p.fill(40);
                p.noStroke();
                p.text(numbers[row][column], x + cellSize / 2, y + cellSize / 2);
            }
        }
    };
};

new p5(sketch);
