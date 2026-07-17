import p5 from "p5";
import { patchSoundFilePlaybackState } from "./p5-sound-adapter";

Object.assign(globalThis, { p5 });

await import("p5.sound");

patchSoundFilePlaybackState(p5.SoundFile);
