// p5.jsの機能を取り込む
import p5 from "p5";
// p5.soundの機能を取り込む
import "./p5-sound";

const sketch = (p5Instance: p5): void => {
    // 再生する音声ファイル
    let music: p5.SoundFile;

    // ブラウザで音声を開始できる状態かどうか
    let isAudioStarted: boolean = false;

    // 音声の読み込みが終わってから、キャンバスを作る
    p5Instance.setup = async (): Promise<void> => {
        music = await p5Instance.loadSound("sounds/background.mp3");
        p5Instance.createCanvas(420, 180);
        p5Instance.textSize(18);
    };

    p5Instance.draw = (): void => {
        p5Instance.background(245);
        p5Instance.fill(30);
        p5Instance.text("Click to play sound", 40, 70);

        if (isAudioStarted) {
            p5Instance.text("Sound is ready", 40, 105);
        } else {
            p5Instance.text("Waiting for first click", 40, 105);
        }
    };

    p5Instance.mousePressed = (): void => {
        if (!isAudioStarted) {
            // ブラウザで音を出すため、最初のクリックで音声を開始する
            p5Instance.userStartAudio();
            isAudioStarted = true;
        }

        // 読み込んでおいた音声を再生する
        music.play();
    };
};

new p5(sketch);
