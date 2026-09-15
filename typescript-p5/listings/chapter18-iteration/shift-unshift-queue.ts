// 画面に表示したいメッセージの待ち行列
const messages: string[] = [];

// pushで、後ろに新しいメッセージを追加する
messages.push("game start");
messages.push("player moved");
messages.push("coin picked");

// unshiftで、先頭に優先して出したいメッセージを追加する
messages.unshift("important notice");

while (messages.length > 0) {
    // shiftで、先頭のメッセージから順に取り出す
    const message: string | undefined = messages.shift();
    console.log(message);
}
