// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // 得点を保存する2次元配列
    const scores: number[][] = [
        [4, 2, 5],
        [1, 3, 2],
        [5, 4, 1],
        [2, 2, 3]
    ];

    p.setup = (): void => {
        p.createCanvas(320, 180);
        p.noLoop();
        p.textSize(18);
    };

    p.draw = (): void => {
        p.background(245);

        // 2次元配列全体の合計を関数で計算する
        const totalScore: number = sumGrid(scores);

        p.fill(40);
        p.text("合計点: " + totalScore, 40, 70);
        p.text("行数: " + scores.length, 40, 110);
        p.text("列数: " + scores[0].length, 40, 140);
    };
};

function sumGrid(values: number[][]): number {
    // すべての要素を足した合計
    let total: number = 0;

    // rowで行を選び、columnでその行の中の列を選ぶ
    for (let row: number = 0; row < values.length; row++) {
        for (let column: number = 0; column < values[row].length; column++) {
            total = total + values[row][column];
        }
    }

    return total;
}

new p5(sketch);
