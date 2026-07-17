// p5.jsの機能を取り込む
import p5 from "p5";

class Player {
    // プレイヤーの中心 x 座標
    centerX: number;
    // プレイヤーの中心 y 座標
    centerY: number;
    // プレイヤーの半径
    radius: number;
    // プレイヤーの移動速度
    speed: number;

    constructor(centerX: number, centerY: number) {
        // プレイヤーの最初の位置と大きさを決める
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = 18;
        this.speed = 4;
    }

    update(p: p5): void {
        // 押されている矢印キーに応じて位置を変える
        if (p.keyIsDown(p.LEFT_ARROW)) {
            this.centerX = this.centerX - this.speed;
        }

        if (p.keyIsDown(p.RIGHT_ARROW)) {
            this.centerX = this.centerX + this.speed;
        }

        if (p.keyIsDown(p.UP_ARROW)) {
            this.centerY = this.centerY - this.speed;
        }

        if (p.keyIsDown(p.DOWN_ARROW)) {
            this.centerY = this.centerY + this.speed;
        }

        // プレイヤーが画面の外へ出ないようにする
        this.centerX = p.constrain(this.centerX, this.radius, p.width - this.radius);
        this.centerY = p.constrain(this.centerY, this.radius, p.height - this.radius);
    }

    display(p: p5): void {
        p.fill(40, 120, 220);
        p.stroke(20);
        p.circle(this.centerX, this.centerY, this.radius * 2);
    }
}

const sketch = (p: p5): void => {
    // 操作するプレイヤー
    let player: Player;

    p.setup = (): void => {
        p.createCanvas(420, 320);
        player = new Player(p.width / 2, p.height / 2);
    };

    p.draw = (): void => {
        p.background(245);

        // 入力に応じて更新してから描く
        player.update(p);
        player.display(p);
    };
};

new p5(sketch);
