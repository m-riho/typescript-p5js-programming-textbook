import p5Core from "p5/node";

declare class p5 extends p5Core {
    constructor(sketch?: (p: p5) => void, node?: HTMLElement, sync?: boolean);
    loadSound(path: string): Promise<p5.SoundFile>;
    userStartAudio(): void;
}

declare namespace p5 {
    type Color = p5Core.Color;
    type Image = p5Core.Image;

    class SoundFile {
        play(): void;
        pause(): void;
        stop(): void;
        loop(value?: boolean): void;
        isPlaying(): boolean;
    }

    class Oscillator {
        constructor(
            frequency?: number,
            type?: "sine" | "triangle" | "sawtooth" | "square"
        );
        start(): void;
        freq(frequency: number, rampTime?: number): void;
        amp(volume: number, rampTime?: number): void;
    }
}

export default p5;
