function countLivingNeighbors(
    board: boolean[][],
    cellX: number,
    cellY: number
): number {
    // 周囲8マスにある生きているセルの数
    let livingCount: number = 0;

    for (let offsetY: number = -1; offsetY <= 1; offsetY++) {
        for (let offsetX: number = -1; offsetX <= 1; offsetX++) {
            // 調べたいセルから見た近所の位置
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
