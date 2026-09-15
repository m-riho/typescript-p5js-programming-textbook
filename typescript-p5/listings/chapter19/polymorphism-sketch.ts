// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // マウスで動かすプレイヤー
    let player: Player;
    // 同じ約束を持つ拾えるものの配列
    const items: CollectibleItem[] = [];
    // 現在の得点
    let score: number = 0;

    p.setup = (): void => {
        p.createCanvas(520, 340);
        player = new Player(p.width / 2, p.height - 60);

        items.push(new LeafItem(120, 40));
        items.push(new GoldenLeafItem(260, 20));
        items.push(new LeafItem(390, 70));
    };

    p.draw = (): void => {
        p.background(235, 245, 238);
        player.update(p);

        for (let index: number = items.length - 1; index >= 0; index--) {
            // どの種類のアイテムでも、同じメソッド名で扱える
            const item: CollectibleItem = items[index];
            item.update(p);
            item.display(p);

            if (item.isCollected(player)) {
                // 種類ごとの得点は、アイテム自身に決めさせる
                score = score + item.getScore();
                items.splice(index, 1);
            } else if (item.isOutsideCanvas(p)) {
                items.splice(index, 1);
            }
        }

        player.display(p);
        displayScore(p, score);
    };
};

function displayScore(p: p5, score: number): void {
    p.fill(40);
    p.textSize(20);
    p.text("score: " + score, 16, 28);
}

new p5(sketch);
