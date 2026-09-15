// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    const barWidths: number[] = [80, 160, 120, 220, 140]; // 棒の長さ

    p.setup = (): void => {
        p.createCanvas(320, 240);

        // 静止画なので draw を1回だけ実行する
        p.noLoop();
    };

    p.draw = (): void => {
        p.background(245);

        const maxIndex: number = findMaxIndex(barWidths); // 最大値の添字番号

        for (let index: number = 0; index < barWidths.length; index++) {
            // 最大値の棒だけ赤くする
            if (index === maxIndex) {
                p.fill(230, 80, 80);
            } else {
                p.fill(160);
            }

            p.stroke(60);
            p.rect(30, 30 + index * 36, barWidths[index], 22);
        }
    };
};

// 配列の中で一番大きい値を持つ添字番号を返す
function findMaxIndex(values: number[]): number {
    let maxIndex: number = 0; // いま一番大きい要素の添字番号

    // 1番目以降を順番に調べる
    for (let index: number = 1; index < values.length; index++) {
        if (values[maxIndex] < values[index]) {
            maxIndex = index;
        }
    }

    return maxIndex;
}

new p5(sketch);
