import assert from "node:assert/strict";
import test from "node:test";

import { patchSoundFilePlaybackState } from "../src/p5-sound-adapter.ts";

type PlayerState = "started" | "stopped";

class TestSoundFile {
    node: {
        playbackRate: number;
        startCount: number;
        state: PlayerState;
    } = {
        playbackRate: 1,
        startCount: 0,
        state: "stopped",
    };

    paused: boolean = false;
    playing: boolean = false;

    play(): void {
        this.node.playbackRate = 1;
        this.playing = true;

        if (!this.paused) {
            this.node.startCount += 1;
            this.node.state = "started";
        }
    }

    pause(): void {
        this.node.playbackRate = 0;
        this.playing = false;
        this.paused = true;
    }

    stop(): void {
        this.node.state = "stopped";
        this.playing = false;
    }

    isPlaying(): boolean {
        return this.playing;
    }
}

patchSoundFilePlaybackState(TestSoundFile);

test("play starts again after pause then stop", (): void => {
    const sound: TestSoundFile = new TestSoundFile();

    sound.play();
    sound.pause();
    sound.stop();
    sound.play();

    assert.equal(sound.node.startCount, 2);
    assert.equal(sound.isPlaying(), true);
});

test("isPlaying is false after the underlying player stops naturally", (): void => {
    const sound: TestSoundFile = new TestSoundFile();

    sound.play();
    sound.node.state = "stopped";

    assert.equal(sound.isPlaying(), false);
});
