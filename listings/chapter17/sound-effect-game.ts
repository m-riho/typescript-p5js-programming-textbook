// p5.jsの機能を取り込む
import p5 from "p5";
// p5.soundの機能を取り込む
import "./p5-sound";

class Player {
    // プレイヤーの中心のx座標
    centerX: number;

    // プレイヤーの中心のy座標
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

    update(p5Instance: p5): void {
        // 押されている矢印キーに応じて位置を変える
        if (p5Instance.keyIsDown(p5Instance.LEFT_ARROW)) {
            this.centerX -= this.speed;
        }

        if (p5Instance.keyIsDown(p5Instance.RIGHT_ARROW)) {
            this.centerX += this.speed;
        }

        if (p5Instance.keyIsDown(p5Instance.UP_ARROW)) {
            this.centerY -= this.speed;
        }

        if (p5Instance.keyIsDown(p5Instance.DOWN_ARROW)) {
            this.centerY += this.speed;
        }

        // プレイヤーが画面の外へ出ないようにする
        this.centerX = p5Instance.constrain(
            this.centerX,
            this.radius,
            p5Instance.width - this.radius
        );
        this.centerY = p5Instance.constrain(
            this.centerY,
            this.radius,
            p5Instance.height - this.radius
        );
    }

    display(p5Instance: p5): void {
        p5Instance.fill(70, 130, 220);
        p5Instance.circle(this.centerX, this.centerY, this.radius * 2);
    }
}

class Star {
    // 星の中心のx座標
    centerX: number;

    // 星の中心のy座標
    centerY: number;

    // 星の半径
    radius: number;

    constructor(p5Instance: p5) {
        // resetで位置を決めるため、ここでは仮の位置を入れておく
        this.centerX = 0;
        this.centerY = 0;
        this.radius = 14;
        this.reset(p5Instance);
    }

    reset(p5Instance: p5): void {
        // 星を画面内のランダムな位置へ移動する
        this.centerX = p5Instance.random(
            this.radius,
            p5Instance.width - this.radius
        );
        this.centerY = p5Instance.random(
            50,
            p5Instance.height - this.radius
        );
    }

    isTouchingPlayer(p5Instance: p5, player: Player): boolean {
        // 星とプレイヤーの中心どうしの距離
        const distance: number = p5Instance.dist(
            this.centerX,
            this.centerY,
            player.centerX,
            player.centerY
        );

        return distance < this.radius + player.radius;
    }

    display(p5Instance: p5): void {
        p5Instance.fill(255, 210, 40);
        p5Instance.circle(this.centerX, this.centerY, this.radius * 2);
    }
}

const sketch = (p5Instance: p5): void => {
    // プレイヤー
    let player: Player;

    // 得点になる星
    let star: Star;

    // 星を取ったときに鳴らす効果音
    let getSound: p5.SoundFile;

    // 現在の得点
    let score: number = 0;

    // ブラウザで音声を開始できる状態かどうか
    let isAudioStarted: boolean = false;

    // 効果音の読み込みが終わってから、ゲームを初期化する
    p5Instance.setup = async (): Promise<void> => {
        getSound = await p5Instance.loadSound("sounds/get-star.wav");
        p5Instance.createCanvas(480, 320);
        player = new Player(p5Instance.width / 2, p5Instance.height - 50);
        star = new Star(p5Instance);
    };

    p5Instance.draw = (): void => {
        p5Instance.background(245);

        player.update(p5Instance);

        if (star.isTouchingPlayer(p5Instance, player)) {
            // 星を取ったら得点を増やし、星を移動する
            score += 1;
            star.reset(p5Instance);

            if (isAudioStarted) {
                // 音声が開始済みなら効果音を鳴らす
                getSound.play();
            }
        }

        star.display(p5Instance);
        player.display(p5Instance);
        displayScore(p5Instance, score);
    };

    p5Instance.mousePressed = (): void => {
        if (!isAudioStarted) {
            // ブラウザで音を出すため、最初のクリックで音声を開始する
            p5Instance.userStartAudio();
            isAudioStarted = true;
        }
    };
};

function displayScore(p5Instance: p5, score: number): void {
    p5Instance.fill(30);
    p5Instance.textSize(18);
    p5Instance.text("Score: " + score, 20, 28);
}

new p5(sketch);
