// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // 格子の行数
    const numberOfRows: number = 5;
    // 格子の列数
    const numberOfColumns: number = 8;
    // 1つのマスの大きさ
    const cellSize: number = 40;
    // 各マスの色を保存する2次元配列
    const cellColors: p5.Color[][] = [];

    p.setup = (): void => {
        p.createCanvas(360, 260);
        p.noLoop();

        // 行ごとに配列を作り、その中に列方向の色を入れる
        for (let row: number = 0; row < numberOfRows; row++) {
            cellColors[row] = [];

            for (let column: number = 0; column < numberOfColumns; column++) {
                cellColors[row][column] = p.color(
                    p.random(80, 240),
                    p.random(80, 240),
                    p.random(80, 240)
                );
            }
        }
    };

    p.draw = (): void => {
        p.background(245);

        // 保存しておいた色を、行と列の順に取り出す
        for (let row: number = 0; row < cellColors.length; row++) {
            for (let column: number = 0; column < cellColors[row].length; column++) {
                // 配列の位置を、画面上の座標に変換する
                const x: number = 20 + column * cellSize;
                const y: number = 20 + row * cellSize;

                p.fill(cellColors[row][column]);
                p.stroke(80);
                p.rect(x, y, cellSize, cellSize);
            }
        }
    };
};

new p5(sketch);
