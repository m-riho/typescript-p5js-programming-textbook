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

function collectChangedCells(
    currentBoard: boolean[][],
    nextBoard: boolean[][]
): CellPosition[] {
    // 前の世代から状態が変わったセルの位置
    const changedCells: CellPosition[] = [];

    for (let y: number = 0; y < currentBoard.length; y++) {
        for (let x: number = 0; x < currentBoard[y].length; x++) {
            // 現在の世代と次の世代で違うセルだけを記録する
            if (currentBoard[y][x] !== nextBoard[y][x]) {
                changedCells.push(new CellPosition(x, y));
            }
        }
    }

    return changedCells;
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

function isInsideBoard(
    board: boolean[][],
    cellX: number,
    cellY: number
): boolean {
    // 盤面の外を調べないように、x方向とy方向を別々に確認する
    const isInsideX: boolean = 0 <= cellX && cellX < board[0].length;
    const isInsideY: boolean = 0 <= cellY && cellY < board.length;

    return isInsideX && isInsideY;
}

function collectCandidateCells(
    board: boolean[][],
    changedCells: CellPosition[]
): CellPosition[] {
    // 次の世代で変わる可能性があるセルの位置
    const candidateCells: CellPosition[] = [];

    for (const changedCell of changedCells) {
        // 変化したセルの周囲だけが、次に変わる可能性を持つ
        for (let offsetY: number = -1; offsetY <= 1; offsetY++) {
            for (let offsetX: number = -1; offsetX <= 1; offsetX++) {
                const candidateX: number = changedCell.x + offsetX;
                const candidateY: number = changedCell.y + offsetY;

                if (isInsideBoard(board, candidateX, candidateY)) {
                    // 同じ候補が何度も入らないように追加する
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
