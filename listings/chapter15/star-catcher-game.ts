// p5.jsの機能を取り込む
import p5 from "p5";

class GameObject {
    // 画面上の中心 x 座標
    centerX: number;
    // 画面上の中心 y 座標
    centerY: number;
    // 当たり判定に使う半径
    radius: number;

    constructor(centerX: number, centerY: number, radius: number) {
        // 当たり判定に必要な共通の状態を初期化する
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
    }

    isTouching(other: GameObject, p: p5): boolean {
        // 2つの円の中心どうしの距離
        const distance: number = p.dist(
            this.centerX,
            this.centerY,
            other.centerX,
            other.centerY
        );

        return distance < this.radius + other.radius;
    }
}

class Player extends GameObject {
    // プレイヤーの移動速度
    speed: number;

    constructor(centerX: number, centerY: number) {
        // 位置と半径は親クラスに初期化してもらう
        super(centerX, centerY, 18);
        this.speed = 4;
    }

    update(p: p5): void {
        // 押されている矢印キーに応じてプレイヤーを動かす
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

        // 画面の外へ出ないようにする
        this.centerX = p.constrain(this.centerX, this.radius, p.width - this.radius);
        this.centerY = p.constrain(this.centerY, this.radius, p.height - this.radius);
    }

    display(p: p5): void {
        p.fill(40, 120, 220);
        p.stroke(20);
        p.circle(this.centerX, this.centerY, this.radius * 2);

        p.fill(255);
        p.noStroke();
        p.circle(this.centerX - 6, this.centerY - 4, 5);
        p.circle(this.centerX + 6, this.centerY - 4, 5);
    }
}

class Star extends GameObject {
    constructor(p: p5) {
        // 位置はresetで決めるため、最初は仮の位置にする
        super(0, 0, 12);
        this.reset(p);
    }

    reset(p: p5): void {
        // 星を画面内のランダムな位置へ移動する
        this.centerX = p.random(this.radius, p.width - this.radius);
        this.centerY = p.random(this.radius + 36, p.height - this.radius);
    }

    display(p: p5): void {
        p.fill(255, 210, 0);
        p.stroke(120, 90, 0);
        p.circle(this.centerX, this.centerY, this.radius * 2);
    }
}

class Enemy extends GameObject {
    // 敵の下向きの速さ
    speedY: number;

    constructor(p: p5) {
        // 位置と速さはresetで設定し直す
        super(0, 0, 16);
        this.speedY = 2;
        this.reset(p);
    }

    reset(p: p5): void {
        // 敵を画面上側のランダムな位置へ戻す
        this.centerX = p.random(this.radius, p.width - this.radius);
        this.centerY = p.random(-p.height, -this.radius);
        this.speedY = p.random(1.5, 3.5);
    }

    update(p: p5): void {
        // 敵を下方向へ動かす
        this.centerY = this.centerY + this.speedY;

        if (this.centerY - this.radius > p.height) {
            this.reset(p);
        }
    }

    display(p: p5): void {
        p.fill(230, 80, 80);
        p.stroke(90, 20, 20);
        p.circle(this.centerX, this.centerY, this.radius * 2);
    }
}

const sketch = (p: p5): void => {
    // 敵の数
    const numberOfEnemies: number = 4;
    // プレイヤー
    let player: Player;
    // 集める星
    let star: Star;
    // 敵をまとめる配列
    const enemies: Enemy[] = [];
    // 現在の得点
    let score: number = 0;
    // 残りライフ
    let life: number = 3;
    // ゲームオーバーかどうか
    let isGameOver: boolean = false;

    p.setup = (): void => {
        p.createCanvas(480, 360);
        p.textSize(18);

        player = new Player(p.width / 2, p.height - 50);
        star = new Star(p);

        for (let index: number = 0; index < numberOfEnemies; index++) {
            enemies[index] = new Enemy(p);
        }
    };

    p.draw = (): void => {
        p.background(245);

        if (isGameOver) {
            // ゲームオーバー中は更新せず、画面表示だけ行う
            displayGameOver(p, score);
            return;
        }

        updateGame(p, player, enemies);

        if (star.isTouching(player, p)) {
            // 星を取ったら得点を増やす
            score = score + 1;
            star.reset(p);
        }

        for (let index: number = 0; index < enemies.length; index++) {
            if (enemies[index].isTouching(player, p)) {
                // 敵に当たったらライフを減らす
                life = life - 1;
                enemies[index].reset(p);
            }
        }

        if (life <= 0) {
            isGameOver = true;
        }

        displayGame(p, player, star, enemies, score, life);
    };

    p.keyPressed = (): void => {
        if (isGameOver && p.key === " ") {
            // スペースキーでゲームを最初の状態に戻す
            score = 0;
            life = 3;
            isGameOver = false;
            player = new Player(p.width / 2, p.height - 50);
            star.reset(p);

            for (let index: number = 0; index < enemies.length; index++) {
                enemies[index].reset(p);
            }
        }
    };
};

function updateGame(
    p: p5,
    player: Player,
    enemies: Enemy[]
): void {
    // 動くものだけをまとめて更新する
    player.update(p);

    for (let index: number = 0; index < enemies.length; index++) {
        enemies[index].update(p);
    }
}

function displayGame(
    p: p5,
    player: Player,
    star: Star,
    enemies: Enemy[],
    score: number,
    life: number
): void {
    // 背景以外のゲーム要素をまとめて描く
    star.display(p);

    for (let index: number = 0; index < enemies.length; index++) {
        enemies[index].display(p);
    }

    player.display(p);
    displayStatus(p, score, life);
}

function displayStatus(p: p5, score: number, life: number): void {
    p.fill(30);
    p.noStroke();
    p.textAlign(p.LEFT, p.TOP);
    p.text("Score: " + score, 12, 10);
    p.text("Life: " + life, 130, 10);
}

function displayGameOver(p: p5, score: number): void {
    p.fill(30);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.text("Game Over", p.width / 2, p.height / 2 - 20);
    p.text("Score: " + score, p.width / 2, p.height / 2 + 10);
    p.text("Press Space", p.width / 2, p.height / 2 + 40);
}

new p5(sketch);
