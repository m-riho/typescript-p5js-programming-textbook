class StoneItem implements CollectibleItem {
    // 石の中心のx座標
    centerX: number;
    // 石の中心のy座標
    centerY: number;
    // 石が下に動く速さ
    speedY: number;
    constructor(centerX: number, centerY: number) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.speedY = 2.4;
    }
    update(p: p5): void {
        this.centerY = this.centerY + this.speedY;
    }
    display(p: p5): void {
        p.fill(110, 110, 115);
        p.noStroke();
        p.circle(this.centerX, this.centerY, 26);
    }
    isCollected(player: Player): boolean {
        return isNear(this.centerX, this.centerY, player, 28);
    }
    isOutsideCanvas(p: p5): boolean {
        return this.centerY > p.height + 30;
    }
    getScore(): number {
        // 石を拾うと得点が下がる
        return -20;
    }
}
function addRandomItem(p: p5, items: CollectibleItem[]): void {
    // 新しく出すアイテムのx座標
    const itemX: number = p.random(30, p.width - 30);
    // どの種類のアイテムを出すかを決める乱数
    const randomValue: number = p.random(1);
    if (randomValue < 0.65) {
        items.push(new LeafItem(itemX, -20));
    } else if (randomValue < 0.85) {
        items.push(new GoldenLeafItem(itemX, -20));
    } else {
        items.push(new StoneItem(itemX, -20));
    }
}
