// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // 石が置かれていないマス
    const empty: number = 0;
    // 黒い石が置かれたマス
    const black: number = 1;
    // 白い石が置かれたマス
    const white: number = 2;
    // 盤面の状態
    const board: number[][] = [
        [empty, empty, empty, empty],
        [empty, white, black, empty],
        [empty, black, white, empty],
        [empty, empty, empty, empty]
    ];
    // 1つのマスの大きさ
    const cellSize: number = 70;
    // 次に置く石が黒かどうか
    let isBlackTurn: boolean = true;

    p.setup = (): void => {
        p.createCanvas(280, 280);
    };

    p.draw = (): void => {
        p.background(30, 130, 70);

        // 盤面の状態を、行と列の順に確認する
        for (let row: number = 0; row < board.length; row++) {
            for (let column: number = 0; column < board[row].length; column++) {
                // マスの中心座標を計算する
                const centerX: number = column * cellSize + cellSize / 2;
                const centerY: number = row * cellSize + cellSize / 2;

                // まず盤面のマスを描く
                p.noFill();
                p.stroke(20);
                p.rect(column * cellSize, row * cellSize, cellSize, cellSize);

                // board[row][column]の値に合わせて石を描く
                if (board[row][column] === black) {
                    p.fill(20);
                    p.circle(centerX, centerY, cellSize * 0.75);
                } else if (board[row][column] === white) {
                    p.fill(245);
                    p.circle(centerX, centerY, cellSize * 0.75);
                }
            }
        }
    };

    p.mousePressed = (): void => {
        // マウス座標から、クリックされた列と行を求める
        const column: number = Math.floor(p.mouseX / cellSize);
        const row: number = Math.floor(p.mouseY / cellSize);

        // 配列の外側をクリックしたときは、値を変更しない
        if (0 <= row && row < board.length) {
            if (0 <= column && column < board[row].length) {
                if (board[row][column] === empty) {
                    // 空いているマスに、現在の手番の石を置く
                    if (isBlackTurn) {
                        board[row][column] = black;
                    } else {
                        board[row][column] = white;
                    }

                    // 次のクリックでは反対の色を置く
                    isBlackTurn = !isBlackTurn;
                }
            }
        }
    };
};

new p5(sketch);
