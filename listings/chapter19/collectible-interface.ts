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
        // マウス位置をプレイヤーの位置として使う
        this.centerX = p.mouseX;
        this.centerY = p.mouseY;
    }

    display(p: p5): void {
        p.fill(60, 120, 180);
        p.noStroke();
        p.circle(this.centerX, this.centerY, this.size);
    }
}

class ScoreLeaf implements CollectibleItem {
    // 落ち葉の中心のx座標
    centerX: number;
    // 落ち葉の中心のy座標
    centerY: number;
    // 落ち葉が下に動く速さ
    speedY: number;

    constructor(centerX: number, centerY: number, speedY: number) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.speedY = speedY;
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
        // プレイヤーとの距離が近ければ拾ったことにする
        const distance: number = Math.sqrt(
            (this.centerX - player.centerX) *
                (this.centerX - player.centerX) +
            (this.centerY - player.centerY) *
                (this.centerY - player.centerY)
        );
        return distance < 26;
    }

    isOutsideCanvas(p: p5): boolean {
        return this.centerY > p.height + 30;
    }

    getScore(): number {
        // 普通の落ち葉を拾ったときの得点
        return 10;
    }
}
