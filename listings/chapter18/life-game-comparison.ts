// p5.jsの機能を取り込む
import p5 from "p5";

class CellPosition {
    // セルの横方向の位置
    x: number;

    // セルの縦方向の位置
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class GenerationResult {
    // 次の世代の盤面
    nextBoard: boolean[][];

    // この世代で状態が変わったセルの位置
    nextChangedCells: CellPosition[];

    // 次の世代を作るために調べたセル数
    checkedCellCount: number;

    constructor(
        nextBoard: boolean[][],
        nextChangedCells: CellPosition[],
        checkedCellCount: number
    ) {
        this.nextBoard = nextBoard;
        this.nextChangedCells = nextChangedCells;
        this.checkedCellCount = checkedCellCount;
    }
}

function createNextBoardByFullScan(board: boolean[][]): boolean[][] {
    // 比較用に、盤面全体を調べて次の世代を作る
    const nextBoard: boolean[][] = [];

    for (let y: number = 0; y < board.length; y++) {
        const nextRow: boolean[] = [];

        for (let x: number = 0; x < board[y].length; x++) {
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

function createNextBoardByChangedCells(
    board: boolean[][],
    changedCells: CellPosition[]
): GenerationResult {
    // 変化したセルの周囲だけを調べて次の世代を作る
    const nextBoard: boolean[][] = copyBoard(board);
    const candidateCells: CellPosition[] = collectCandidateCells(
        board,
        changedCells
    );
    const nextChangedCells: CellPosition[] = [];

    for (const candidateCell of candidateCells) {
        // 候補になったセルだけ、次の状態を計算する
        const x: number = candidateCell.x;
        const y: number = candidateCell.y;
        const livingNeighbors: number = countLivingNeighbors(board, x, y);
        const nextState: boolean = getNextCellState(
            board[y][x],
            livingNeighbors
        );

        nextBoard[y][x] = nextState;

        if (board[y][x] !== nextState) {
            nextChangedCells.push(new CellPosition(x, y));
        }
    }

    return new GenerationResult(
        nextBoard,
        nextChangedCells,
        candidateCells.length
    );
}

function copyBoard(board: boolean[][]): boolean[][] {
    // 元の盤面を壊さないように、同じ内容の盤面を作る
    const copiedBoard: boolean[][] = [];

    for (let y: number = 0; y < board.length; y++) {
        const copiedRow: boolean[] = [];

        for (let x: number = 0; x < board[y].length; x++) {
            copiedRow.push(board[y][x]);
        }

        copiedBoard.push(copiedRow);
    }

    return copiedBoard;
}

function collectCandidateCells(
    board: boolean[][],
    changedCells: CellPosition[]
): CellPosition[] {
    // 次の世代で状態が変わる可能性があるセル
    const candidateCells: CellPosition[] = [];

    for (const changedCell of changedCells) {
        for (let offsetY: number = -1; offsetY <= 1; offsetY++) {
            for (let offsetX: number = -1; offsetX <= 1; offsetX++) {
                const candidateX: number = changedCell.x + offsetX;
                const candidateY: number = changedCell.y + offsetY;

                if (isInsideBoard(board, candidateX, candidateY)) {
                    addPositionIfNeeded(
                        candidateCells,
                        candidateX,
                        candidateY
                    );
                }
            }
        }
    }

    return candidateCells;
}

function addPositionIfNeeded(
    positions: CellPosition[],
    cellX: number,
    cellY: number
): void {
    // 同じ位置を二重に候補へ入れないようにする
    for (const position of positions) {
        if (position.x === cellX && position.y === cellY) {
            return;
        }
    }

    positions.push(new CellPosition(cellX, cellY));
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
    if (isAlive) {
        return livingNeighbors === 2 || livingNeighbors === 3;
    }

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

function createInitialChangedCells(
    boardWidth: number,
    boardHeight: number
): CellPosition[] {
    // 最初だけは全セルを候補にするための位置リスト
    const changedCells: CellPosition[] = [];

    for (let y: number = 0; y < boardHeight; y++) {
        for (let x: number = 0; x < boardWidth; x++) {
            changedCells.push(new CellPosition(x, y));
        }
    }

    return changedCells;
}

function createRandomBoard(
    boardWidth: number,
    boardHeight: number
): boolean[][] {
    // 比較に使う最初の盤面をランダムに作る
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

const sketch = (p: p5): void => {
    // 盤面の横方向のセル数
    const boardWidth: number = 80;

    // 盤面の縦方向のセル数
    const boardHeight: number = 45;

    // 1つのセルを描く大きさ
    const cellSize: number = 10;

    // Life Gameの盤面
    let board: boolean[][] = [];

    // 前の世代で変化したセルの位置
    let changedCells: CellPosition[] = [];

    // 全探索版で調べるセルの数
    let fullScanCellCount: number = 0;

    // 差分更新版で調べたセルの数
    let changedCellCount: number = 0;

    // 今が何世代目かを表す数
    let generation: number = 0;

    p.setup = (): void => {
        p.createCanvas(boardWidth * cellSize, boardHeight * cellSize + 64);
        p.frameRate(8);
        // 最初の世代と、最初に調べる候補を用意する
        board = createRandomBoard(boardWidth, boardHeight);
        changedCells = createInitialChangedCells(boardWidth, boardHeight);
        fullScanCellCount = boardWidth * boardHeight;
    };

    p.draw = (): void => {
        p.background(245);
        drawBoard(p, board, cellSize);
        drawComparisonText(
            p,
            generation,
            fullScanCellCount,
            changedCellCount,
            boardHeight * cellSize
        );

        // 差分更新版で次の世代を作り、調べたセル数を記録する
        const result = createNextBoardByChangedCells(board, changedCells);
        board = result.nextBoard;
        changedCells = result.nextChangedCells;
        changedCellCount = result.checkedCellCount;
        generation++;
    };
};

function drawComparisonText(
    p: p5,
    generation: number,
    fullScanCellCount: number,
    changedCellCount: number,
    textY: number
): void {
    p.fill(30);
    p.textSize(15);
    p.text(`generation: ${generation}`, 12, textY + 20);
    p.text(`full scan: ${fullScanCellCount} cells`, 12, textY + 40);
    p.text(`changed area: ${changedCellCount} cells`, 220, textY + 40);
}

new p5(sketch);
