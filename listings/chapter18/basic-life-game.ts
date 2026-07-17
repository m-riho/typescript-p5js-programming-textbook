// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // 盤面の横方向のセル数
    const boardWidth: number = 40;

    // 盤面の縦方向のセル数
    const boardHeight: number = 30;

    // 1つのセルを描く大きさ
    const cellSize: number = 16;

    // Life Gameの盤面
    let board: boolean[][] = [];

    p.setup = (): void => {
        p.createCanvas(boardWidth * cellSize, boardHeight * cellSize);
        // 最初の世代をランダムに作る
        board = createRandomBoard(boardWidth, boardHeight);
    };

    p.draw = (): void => {
        p.background(240);
        drawBoard(p, board, cellSize);
    };
};

function createRandomBoard(
    boardWidth: number,
    boardHeight: number
): boolean[][] {
    // 作成した盤面を行ごとに入れる配列
    const board: boolean[][] = [];

    for (let y: number = 0; y < boardHeight; y++) {
        // 1行分のセルを入れる配列
        const row: boolean[] = [];

        for (let x: number = 0; x < boardWidth; x++) {
            // trueなら生きているセル
            const isAlive: boolean = Math.random() < 0.25;
            row.push(isAlive);
        }

        board.push(row);
    }

    return board;
}

function drawBoard(
    p: p5,
    board: boolean[][],
    cellSize: number
): void {
    // board[y][x]の値に応じてセルの色を変える
    for (let y: number = 0; y < board.length; y++) {
        for (let x: number = 0; x < board[y].length; x++) {
            if (board[y][x]) {
                p.fill(40, 140, 90);
            } else {
                p.fill(245);
            }

            p.stroke(210);
            p.rect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

new p5(sketch);
