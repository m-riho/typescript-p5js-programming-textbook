// 操作履歴を表すリスト
const commands: string[] = [];

// pushで、リストの最後に操作を追加する
commands.push("move right");
commands.push("jump");
commands.push("get star");

console.log(commands);

if (commands.length > 0) {
    // popで、最後に入れた操作を取り出す
    const lastCommand: string | undefined = commands.pop();
    console.log("undo: " + lastCommand);
}

console.log(commands);
