// p5.jsの機能を取り込む
import p5 from "p5";
// p5.soundの機能を取り込む
import "./p5-sound";

const sketch = (p5Instance: p5): void => {
    // 再生する音楽
    let music: p5.SoundFile;

    // ブラウザで音声を開始できる状態かどうか
    let isAudioStarted: boolean = false;

    // 音声の読み込みが終わってから、キャンバスを作る
    p5Instance.setup = async (): Promise<void> => {
        music = await p5Instance.loadSound("sounds/background.mp3");
        p5Instance.createCanvas(480, 220);
        p5Instance.textSize(18);
    };

    p5Instance.draw = (): void => {
        p5Instance.background(245);
        p5Instance.fill(30);
        p5Instance.text("Mouse: play from start", 40, 60);
        p5Instance.text("P: pause", 40, 95);
        p5Instance.text("L: loop", 40, 130);
        p5Instance.text("S: stop", 40, 165);

        if (music.isPlaying()) {
            p5Instance.text("Now playing", 260, 60);
        } else {
            p5Instance.text("Not playing", 260, 60);
        }
    };

    p5Instance.mousePressed = (): void => {
        startAudioIfNeeded();
        // 先頭から再生し直すため、一度止めてから再生する
        music.stop();
        music.play();
    };

    p5Instance.keyPressed = (): void => {
        startAudioIfNeeded();

        // 押されたキーに応じて、音声の操作を変える
        if (p5Instance.key === "p" || p5Instance.key === "P") {
            music.pause();
        } else if (p5Instance.key === "l" || p5Instance.key === "L") {
            music.loop();
            if (!music.isPlaying()) {
                music.play();
            }
        } else if (p5Instance.key === "s" || p5Instance.key === "S") {
            music.stop();
        }
    };

    const startAudioIfNeeded = (): void => {
        if (!isAudioStarted) {
            // ブラウザで音を出すため、最初の操作で音声を開始する
            p5Instance.userStartAudio();
            isAudioStarted = true;
        }
    };
};

new p5(sketch);
