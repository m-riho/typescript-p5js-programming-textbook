// p5.jsの機能を取り込む
import p5 from "p5";
const sketch = (p: p5): void => {
    // 格子の状態を保存する2次元配列
    const isPainted: boolean[][] = [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false]
    ];
    // 1つのマスの大きさ
    const cellSize: number = 60;
    p.setup = (): void => {
        p.createCanvas(300, 240);
    };
    p.draw = (): void => {
        p.background(245);
        for (let row: number = 0; row < isPainted.length; row++) {
            for (let column: number = 0; column < isPainted[row].length; column++) {
                const x: number = column * cellSize;
                const y: number = row * cellSize;
                if (isPainted[row][column]) {
                    p.fill(80, 160, 230);
                } else {
                    p.fill(255);
                }
                p.stroke(80);
                p.rect(x, y, cellSize, cellSize);
            }
        }
    };
    p.mousePressed = (): void => {
        // マウス座標から、クリックされた列と行を求める
        const column: number = Math.floor(p.mouseX / cellSize);
        const row: number = Math.floor(p.mouseY / cellSize);
        if (0 <= row && row < isPainted.length) {
            if (0 <= column && column < isPainted[row].length) {
                // trueとfalseを入れ替える
                isPainted[row][column] = !isPainted[row][column];
            }
        }
    };
};
new p5(sketch);
