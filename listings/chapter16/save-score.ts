// p5.jsの機能を取り込む
import p5 from "p5";

const sketch = (p: p5): void => {
    // 現在の得点
    let score: number = 0;

    // 保存してある最高得点
    let highScore: number = 0;

    p.setup = (): void => {
        p.createCanvas(480, 320);

        // 前回保存した最高得点があれば読み込む
        const savedHighScore = p.getItem("highScore");
        if (typeof savedHighScore === "number") {
            highScore = savedHighScore;
        }
    };

    p.draw = (): void => {
        p.background(245);

        p.fill(40);
        p.textSize(20);
        p.text("Score: " + score, 40, 80);
        p.text("High Score: " + highScore, 40, 120);

        p.textSize(14);
        p.text("S: save score", 40, 180);
        p.text("R: reset high score", 40, 205);
    };

    p.mousePressed = (): void => {
        // 動作確認用に、クリックするたび得点を増やす
        score += 10;
    };

    p.keyPressed = (): void => {
        if (p.key === "s" || p.key === "S") {
            saveHighScore();
        }

        if (p.key === "r" || p.key === "R") {
            resetHighScore();
        }
    };

    const saveHighScore = (): void => {
        // 現在の得点が最高得点を上回ったときだけ保存する
        if (score > highScore) {
            highScore = score;
            p.storeItem("highScore", highScore);
        }
    };

    const resetHighScore = (): void => {
        // 画面上の値と、保存してある値の両方を消す
        score = 0;
        highScore = 0;
        p.removeItem("highScore");
    };
};

new p5(sketch);
