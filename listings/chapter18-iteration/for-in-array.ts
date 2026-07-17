// 番号付きで表示したいアイテム名のリスト
const itemNames: string[] = [
    "star",
    "coin",
    "key"
];

for (const indexText in itemNames) {
    // for...inで取り出される番号は文字列
    const index: number = Number(indexText);

    // 番号を使って配列の値を取り出す
    const itemName: string = itemNames[index];
    console.log(index + ": " + itemName);
}
