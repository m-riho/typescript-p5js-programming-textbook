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

class Star {
    // 星の中心 x 座標
    centerX: number;
    // 星の中心 y 座標
    centerY: number;
    // 星の半径
    radius: number;

    constructor(p: p5) {
        // resetで位置を決めるため、ここでは仮の位置を入れておく
        this.radius = 12;
        this.centerX = 0;
        this.centerY = 0;
        this.reset(p);
    }

    reset(p: p5): void {
        // 星を画面内のランダムな位置へ移動する
        this.centerX = p.random(this.radius, p.width - this.radius);
        this.centerY = p.random(this.radius + 30, p.height - this.radius);
    }

    isTouching(player: Player, p: p5): boolean {
        // 星とプレイヤーの中心どうしの距離
        const distance: number = p.dist(
            this.centerX,
            this.centerY,
            player.centerX,
            player.centerY
        );

        return distance < this.radius + player.radius;
    }

    display(p: p5): void {
        p.fill(255, 210, 0);
        p.stroke(120, 90, 0);
        p.circle(this.centerX, this.centerY, this.radius * 2);
    }
}

const sketch = (p: p5): void => {
    // 操作するプレイヤー
    let player: Player;
    // 集める対象になる星
    let star: Star;
    // 取った星の数
    let score: number = 0;

    p.setup = (): void => {
        p.createCanvas(420, 320);
        p.textSize(18);
        player = new Player(p.width / 2, p.height / 2);
        star = new Star(p);
    };

    p.draw = (): void => {
        p.background(245);

        player.update(p);

        if (star.isTouching(player, p)) {
            // 星に触れたら得点を増やし、星を移動する
            score = score + 1;
            star.reset(p);
        }

        star.display(p);
        player.display(p);
        displayScore(p, score);
    };
};

function displayScore(p: p5, score: number): void {
    p.fill(30);
    p.noStroke();
    p.textAlign(p.LEFT, p.TOP);
    p.text("Score: " + score, 12, 10);
}

new p5(sketch);
