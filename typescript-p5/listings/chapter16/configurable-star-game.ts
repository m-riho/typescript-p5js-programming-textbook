// p5.jsの機能を取り込む
import p5 from "p5";

class GameSettings {
    // キャンバスの幅
    canvasWidth: number;

    // キャンバスの高さ
    canvasHeight: number;

    // プレイヤーの移動速度
    playerSpeed: number;

    // 敵の落ちる速さ
    enemySpeed: number;

    // 星を1つ取ったときに増える得点
    starScore: number;

    // ゲーム開始時のライフ
    startLife: number;

    constructor(settingsData: {
        canvasWidth: number;
        canvasHeight: number;
        playerSpeed: number;
        enemySpeed: number;
        starScore: number;
        startLife: number;
    }) {
        // JSONから読み込んだ値を、ゲーム内で使いやすい形にする
        this.canvasWidth = settingsData.canvasWidth;
        this.canvasHeight = settingsData.canvasHeight;
        this.playerSpeed = settingsData.playerSpeed;
        this.enemySpeed = settingsData.enemySpeed;
        this.starScore = settingsData.starScore;
        this.startLife = settingsData.startLife;
    }
}

class Player {
    // プレイヤーの中心のx座標
    centerX: number;

    // プレイヤーの中心のy座標
    centerY: number;

    // プレイヤーの半径
    radius: number;

    constructor(centerX: number, centerY: number, radius: number) {
        // プレイヤーの位置と当たり判定の大きさを決める
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
    }

    update(p: p5, speed: number): void {
        // 設定ファイルから読み込んだ速さでプレイヤーを動かす
        if (p.keyIsDown(p.LEFT_ARROW)) {
            this.centerX -= speed;
        }

        if (p.keyIsDown(p.RIGHT_ARROW)) {
            this.centerX += speed;
        }

        if (p.keyIsDown(p.UP_ARROW)) {
            this.centerY -= speed;
        }

        if (p.keyIsDown(p.DOWN_ARROW)) {
            this.centerY += speed;
        }

        this.centerX = p.constrain(
            this.centerX,
            this.radius,
            p.width - this.radius
        );
        this.centerY = p.constrain(
            this.centerY,
            this.radius,
            p.height - this.radius
        );
    }

    display(p: p5): void {
        p.fill(70, 130, 220);
        p.circle(this.centerX, this.centerY, this.radius * 2);
    }
}

class Star {
    // 星の中心のx座標
    centerX: number;

    // 星の中心のy座標
    centerY: number;

    // 星の半径
    radius: number;

    constructor(centerX: number, centerY: number, radius: number) {
        // 星の位置と当たり判定の大きさを決める
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
    }

    reset(p: p5): void {
        // 星を画面内のランダムな位置へ移動する
        this.centerX = p.random(this.radius, p.width - this.radius);
        this.centerY = p.random(this.radius, p.height - this.radius);
    }

    isTouchingPlayer(p: p5, player: Player): boolean {
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
        p.fill(255, 210, 40);
        p.circle(this.centerX, this.centerY, this.radius * 2);
    }
}

class Enemy {
    // 敵の中心のx座標
    centerX: number;

    // 敵の中心のy座標
    centerY: number;

    // 敵の半径
    radius: number;

    constructor(centerX: number, centerY: number, radius: number) {
        // 敵の位置と当たり判定の大きさを決める
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
    }

    update(p: p5, speed: number): void {
        // 設定ファイルから読み込んだ速さで敵を落とす
        this.centerY += speed;

        if (this.centerY > p.height + this.radius) {
            // 画面下へ出たら、画面上から落とし直す
            this.centerX = p.random(this.radius, p.width - this.radius);
            this.centerY = -this.radius;
        }
    }

    isTouchingPlayer(p: p5, player: Player): boolean {
        // 敵とプレイヤーの中心どうしの距離
        const distance: number = p.dist(
            this.centerX,
            this.centerY,
            player.centerX,
            player.centerY
        );

        return distance < this.radius + player.radius;
    }

    display(p: p5): void {
        p.fill(230, 80, 80);
        p.circle(this.centerX, this.centerY, this.radius * 2);
    }
}

const sketch = (p: p5): void => {
    // JSONファイルから読み込んだゲーム設定
    let gameSettings: GameSettings;

    // プレイヤー
    let player: Player;

    // 得点になる星
    let star: Star;

    // 上から落ちてくる敵
    let enemy: Enemy;

    // 現在の得点
    let score: number = 0;

    // 保存してある最高得点
    let highScore: number = 0;

    // 残りライフ
    let life: number = 0;

    // ゲームオーバーかどうか
    let isGameOver: boolean = false;

    // 設定の読み込みが終わってから、ゲームを初期化する
    p.setup = async (): Promise<void> => {
        // JSONから読み込んだ設定データ
        const settingsData = await p.loadJSON(
            "data/game-settings.json"
        ) as {
            canvasWidth: number;
            canvasHeight: number;
            playerSpeed: number;
            enemySpeed: number;
            starScore: number;
            startLife: number;
        };

        gameSettings = new GameSettings(settingsData);
        // JSONから読み込んだサイズでキャンバスを作る
        p.createCanvas(
            gameSettings.canvasWidth,
            gameSettings.canvasHeight
        );

        // 前回保存した最高得点があれば読み込む
        const savedHighScore = p.getItem("highScore");
        if (typeof savedHighScore === "number") {
            highScore = savedHighScore;
        }

        resetGame();
    };

    p.draw = (): void => {
        p.background(245);

        if (!isGameOver) {
            updateGame();
        }

        displayGame();
    };

    p.keyPressed = (): void => {
        if (isGameOver && p.key === " ") {
            resetGame();
        }
    };

    const updateGame = (): void => {
        // 設定値を渡して、プレイヤーと敵を更新する
        player.update(p, gameSettings.playerSpeed);
        enemy.update(p, gameSettings.enemySpeed);

        if (star.isTouchingPlayer(p, player)) {
            // 星を取ったら、設定ファイルで決めた点数を加える
            score += gameSettings.starScore;
            star.reset(p);
        }

        if (enemy.isTouchingPlayer(p, player)) {
            // 敵に当たったらライフを減らす
            life -= 1;
            enemy.centerY = -enemy.radius;
        }

        if (life <= 0) {
            isGameOver = true;
            // ゲーム終了時に最高得点を保存する
            saveHighScore();
        }
    };

    const displayGame = (): void => {
        star.display(p);
        enemy.display(p);
        player.display(p);

        p.fill(40);
        p.textSize(16);
        p.text("Score: " + score, 20, 28);
        p.text("High Score: " + highScore, 20, 50);
        p.text("Life: " + life, 20, 72);

        if (isGameOver) {
            p.textSize(28);
            p.textAlign(p.CENTER, p.CENTER);
            p.text("Game Over", p.width / 2, p.height / 2 - 20);
            p.textSize(16);
            p.text("Press Space", p.width / 2, p.height / 2 + 20);
            p.textAlign(p.LEFT, p.BASELINE);
        }
    };

    const resetGame = (): void => {
        // ゲームを開始時の状態に戻す
        player = new Player(p.width / 2, p.height - 50, 18);
        star = new Star(120, 100, 14);
        enemy = new Enemy(240, -20, 18);

        star.reset(p);
        score = 0;
        life = gameSettings.startLife;
        isGameOver = false;
    };

    const saveHighScore = (): void => {
        // 現在の得点が最高得点を上回ったときだけ保存する
        if (score > highScore) {
            highScore = score;
            p.storeItem("highScore", highScore);
        }
    };
};

new p5(sketch);
