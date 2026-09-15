// プレイヤー名をキー、得点を値として持つ表
const scores: { [playerName: string]: number } = {
    Aoi: 120,
    Ren: 90,
    Mika: 150
};

for (const playerName in scores) {
    // キーを使って、対応する得点を取り出す
    const score: number = scores[playerName];
    console.log(playerName + ": " + score);
}
