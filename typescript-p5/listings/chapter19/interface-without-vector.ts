interface SimpleCollectible {
    // 複数のクラスを同じ配列で扱うための約束
    update(p: p5): void;
    display(p: p5): void;
    isCollected(player: Player): boolean;
    isOutsideCanvas(p: p5): boolean;
    getScore(): number;
}

function isNear(
    itemX: number,
    itemY: number,
    player: Player,
    distanceLimit: number
): boolean {
    // 2点の距離を使って、プレイヤーが十分近いか調べる
    const distance: number = Math.sqrt(
        (itemX - player.centerX) * (itemX - player.centerX) +
        (itemY - player.centerY) * (itemY - player.centerY)
    );

    return distance < distanceLimit;
}

class LeafItem implements SimpleCollectible {
    // 落ち葉の中心のx座標
    centerX: number;
    // 落ち葉の中心のy座標
    centerY: number;
    // 落ち葉が下に動く速さ
    speedY: number;

    constructor(centerX: number, centerY: number) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.speedY = 1.8;
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
