// p5.jsの機能を取り込む
import p5 from "p5";
// p5.soundの機能を取り込む
import "./p5-sound";

const sketch = (p5Instance: p5): void => {
    // プログラムで作る発振器
    let oscillator: p5.Oscillator;

    // 音を出しているかどうか
    let isPlaying: boolean = false;

    // 発振器を一度開始したかどうか
    let isOscillatorStarted: boolean = false;

    p5Instance.setup = (): void => {
        p5Instance.createCanvas(480, 220);
        p5Instance.textSize(18);

        // 440Hzの正弦波を出す発振器を作り、最初は音量0にする
        oscillator = new p5.Oscillator(440, "sine");
        oscillator.amp(0);
    };

    p5Instance.draw = (): void => {
        p5Instance.background(245);

        // マウスのx座標から決める周波数
        const frequency: number = p5Instance.map(
            p5Instance.mouseX,
            0,
            p5Instance.width,
            220,
            880
        );

        oscillator.freq(frequency);

        // 現在の周波数を画面に表示する
        p5Instance.fill(30);
        p5Instance.text("Click: sound on/off", 40, 70);
        p5Instance.text(
            "Frequency: " + p5Instance.round(frequency) + " Hz",
            40,
            110
        );
    };

    p5Instance.mousePressed = (): void => {
        // ブラウザで音を出すため、クリック時に音声を開始する
        p5Instance.userStartAudio();

        if (!isOscillatorStarted) {
            // 発振器は、最初のクリックで一度だけ開始する
            oscillator.start();
            isOscillatorStarted = true;
        }

        if (isPlaying) {
            // すぐに切らず、0.1秒かけて音量を下げる
            oscillator.amp(0, 0.1);
            isPlaying = false;
        } else {
            // 0.1秒かけて音量を上げる
            oscillator.amp(0.3, 0.1);
            isPlaying = true;
        }
    };
};

new p5(sketch);
