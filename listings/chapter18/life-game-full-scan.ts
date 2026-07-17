// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // 盤面の横方向のセル数
    const boardWidth: number = 60;

    // 盤面の縦方向のセル数
    const boardHeight: number = 40;

    // 1つのセルを描く大きさ
    const cellSize: number = 12;

    // Life Gameの盤面
    let board: boolean[][] = [];

    // 今が何世代目かを表す数
    let generation: number = 0;

    p.setup = (): void => {
        p.createCanvas(boardWidth * cellSize, boardHeight * cellSize + 36);
        p.frameRate(8);
        // 最初の世代をランダムに作る
        board = createRandomBoard(boardWidth, boardHeight);
    };

    p.draw = (): void => {
        p.background(245);
        drawBoard(p, board, cellSize);
        drawGeneration(p, generation, boardHeight * cellSize);

        // 毎世代、盤面全体を調べて次の世代を作る
        board = createNextBoardByFullScan(board);
        generation++;
    };
};

function createNextBoardByFullScan(board: boolean[][]): boolean[][] {
    // 次の世代の盤面を行ごとに作る
    const nextBoard: boolean[][] = [];

    for (let y: number = 0; y < board.length; y++) {
        // 次の世代の1行分を作る配列
        const nextRow: boolean[] = [];

        for (let x: number = 0; x < board[y].length; x++) {
            // 1つのセルについて周囲を調べ、次の状態を決める
            const livingNeighbors: number = countLivingNeighbors(board, x, y);
            const nextState: boolean = getNextCellState(
                board[y][x],
                livingNeighbors
            );

            nextRow.push(nextState);
        }

        nextBoard.push(nextRow);
    }

    return nextBoard;
}

function countLivingNeighbors(
    board: boolean[][],
    cellX: number,
    cellY: number
): number {
    // 周囲8マスにある生きているセルの数
    let livingCount: number = 0;

    for (let offsetY: number = -1; offsetY <= 1; offsetY++) {
        for (let offsetX: number = -1; offsetX <= 1; offsetX++) {
            // 中心セルから見た、近くのセルの位置
            const neighborX: number = cellX + offsetX;
            const neighborY: number = cellY + offsetY;
            const isCenterCell: boolean = offsetX === 0 && offsetY === 0;

            if (!isCenterCell && isInsideBoard(board, neighborX, neighborY)) {
                if (board[neighborY][neighborX]) {
                    livingCount++;
                }
            }
        }
    }

    return livingCount;
}

function getNextCellState(
    isAlive: boolean,
    livingNeighbors: number
): boolean {
    // 生きているセルは、周囲が2個または3個なら生き残る
    if (isAlive) {
        return livingNeighbors === 2 || livingNeighbors === 3;
    }

    // 死んでいるセルは、周囲が3個なら新しく生まれる
    return livingNeighbors === 3;
}

function isInsideBoard(
    board: boolean[][],
    cellX: number,
    cellY: number
): boolean {
    const isInsideX: boolean = 0 <= cellX && cellX < board[0].length;
    const isInsideY: boolean = 0 <= cellY && cellY < board.length;

    return isInsideX && isInsideY;
}

function createRandomBoard(
    boardWidth: number,
    boardHeight: number
): boolean[][] {
    // 作成した盤面を行ごとに入れる配列
    const board: boolean[][] = [];

    for (let y: number = 0; y < boardHeight; y++) {
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
            p.noStroke();

            if (board[y][x]) {
                p.fill(40, 140, 90);
            } else {
                p.fill(238);
            }

            p.rect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

function drawGeneration(
    p: p5,
    generation: number,
    textY: number
): void {
    p.fill(30);
    p.textSize(16);
    p.text(`generation: ${generation}`, 12, textY + 24);
}

new p5(sketch);
