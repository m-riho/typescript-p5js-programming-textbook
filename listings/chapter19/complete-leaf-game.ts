// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // マウスで動かすプレイヤー
    let player: Player;
    // 落ちてくるアイテムをまとめる配列
    const items: CollectibleItem[] = [];
    // 現在の得点
    let score: number = 0;
    // アイテムを追加する間隔
    const addInterval: number = 45;

    p.setup = (): void => {
        p.createCanvas(520, 340);
        player = new Player(p.width / 2, p.height - 60);
    };

    p.draw = (): void => {
        p.background(235, 245, 238);

        if (p.frameCount % addInterval === 0) {
            // 一定間隔で、新しいアイテムを1つ追加する
            addRandomItem(p, items);
        }

        player.update(p);
        updateItems(p);
        player.display(p);
        displayScore(p, score);
    };

    function updateItems(p: p5): void {
        for (let index: number = items.length - 1; index >= 0; index--) {
            // CollectibleItem型なので、種類が違っても同じ処理で扱える
            const item: CollectibleItem = items[index];
            item.update(p);
            item.display(p);

            if (item.isCollected(player)) {
                score = score + item.getScore();
                items.splice(index, 1);
            } else if (item.isOutsideCanvas(p)) {
                items.splice(index, 1);
            }
        }
    }
};

new p5(sketch);
