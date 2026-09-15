interface CollectibleItem {
    // 拾えるものが共通して持つ操作の約束
    update(p: p5): void;
    display(p: p5): void;
    isCollected(player: Player): boolean;
    isOutsideCanvas(p: p5): boolean;
    getScore(): number;
}

class Player {
    // プレイヤーの中心のx座標
    centerX: number;
    // プレイヤーの中心のy座標
    centerY: number;
    // プレイヤーの大きさ
    size: number;

    constructor(centerX: number, centerY: number) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.size = 36;
    }

    update(p: p5): void {
        this.centerX = p.mouseX;
        this.centerY = p.mouseY;
    }

    display(p: p5): void {
        p.fill(60, 120, 180);
        p.noStroke();
        p.circle(this.centerX, this.centerY, this.size);
    }
}

function isNear(
    itemX: number,
    itemY: number,
    player: Player,
    distanceLimit: number
): boolean {
    // アイテムとプレイヤーの距離で、拾えたかどうかを判断する
    const distance: number = Math.sqrt(
        (itemX - player.centerX) * (itemX - player.centerX) +
        (itemY - player.centerY) * (itemY - player.centerY)
    );

    return distance < distanceLimit;
}

class LeafItem implements CollectibleItem {
    // 落ち葉の中心のx座標
    centerX: number;
    // 落ち葉の中心のy座標
    centerY: number;
    // 落ち葉が下に動く速さ
    speedY: number;

    constructor(centerX: number, centerY: number) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.speedY = 1.6;
    }

    update(p: p5): void {
        this.centerY = this.centerY + this.speedY;
    }

    display(p: p5): void {
        p.fill(190, 100, 45);
        p.noStroke();
        p.ellipse(this.centerX, this.centerY, 34, 18);
    }

    isCollected(player: Player): boolean {
        return isNear(this.centerX, this.centerY, player, 28);
    }

    isOutsideCanvas(p: p5): boolean {
        return this.centerY > p.height + 30;
    }

    getScore(): number {
        // 普通の落ち葉を拾ったときの得点
        return 10;
    }
}

class GoldenLeafItem implements CollectibleItem {
    // 金色の落ち葉の中心のx座標
    centerX: number;
    // 金色の落ち葉の中心のy座標
    centerY: number;
    // 金色の落ち葉が下に動く速さ
    speedY: number;

    constructor(centerX: number, centerY: number) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.speedY = 2.2;
    }

    update(p: p5): void {
        this.centerY = this.centerY + this.speedY;
    }

    display(p: p5): void {
        p.fill(245, 190, 45);
        p.noStroke();
        p.ellipse(this.centerX, this.centerY, 40, 20);
        p.fill(255, 240, 150);
        p.circle(this.centerX - 6, this.centerY - 3, 7);
    }

    isCollected(player: Player): boolean {
        return isNear(this.centerX, this.centerY, player, 30);
    }

    isOutsideCanvas(p: p5): boolean {
        return this.centerY > p.height + 30;
    }

    getScore(): number {
        // 金色の落ち葉は高得点にする
        return 30;
    }
}
