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
        // JSONから読み込んだ値を、扱いやすい形で保存する
        this.canvasWidth = settingsData.canvasWidth;
        this.canvasHeight = settingsData.canvasHeight;
        this.playerSpeed = settingsData.playerSpeed;
        this.enemySpeed = settingsData.enemySpeed;
        this.starScore = settingsData.starScore;
        this.startLife = settingsData.startLife;
    }
}

const sketch = (p: p5): void => {
    // JSONファイルから読み込んだゲーム設定
    let gameSettings: GameSettings;

    // JSONの読み込みが終わってから、キャンバスを作る
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
        // 読み込んだ設定値を使ってキャンバスを作る
        p.createCanvas(
            gameSettings.canvasWidth,
            gameSettings.canvasHeight
        );
    };

    p.draw = (): void => {
        p.background(240);
        // JSONから読み込んだ値を画面に表示して確認する
        p.fill(40);
        p.textSize(18);
        p.text("playerSpeed: " + gameSettings.playerSpeed, 40, 80);
        p.text("enemySpeed: " + gameSettings.enemySpeed, 40, 110);
        p.text("starScore: " + gameSettings.starScore, 40, 140);
        p.text("startLife: " + gameSettings.startLife, 40, 170);
    };
};

new p5(sketch);
