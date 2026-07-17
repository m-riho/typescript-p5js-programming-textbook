interface SoundFileConstructor {
    prototype: object;
}

interface SoundFilePrototype {
    node: {
        state: string;
    };
    paused: boolean;
    playing: boolean;
    stop(): void;
    isPlaying(): boolean;
}

export function patchSoundFilePlaybackState(
    SoundFile: SoundFileConstructor
): void {
    const prototype: SoundFilePrototype =
        SoundFile.prototype as SoundFilePrototype;
    const originalStop: () => void = prototype.stop;

    prototype.stop = function (): void {
        originalStop.call(this);
        this.paused = false;
    };

    prototype.isPlaying = function (): boolean {
        return this.playing && this.node.state === "started";
    };
}
