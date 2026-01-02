import { Howl } from 'howler';

export class BGMPlayer {
  private static readonly BGM_FILES = [
    '/audio/distant_apartment_drone_1.mp3',
    '/audio/distant_apartment_drone_2.mp3',
    '/audio/ghost_mall_pa_system_1.mp3',
    '/audio/ghost_mall_pa_system_2.mp3'
  ];
  private static readonly DEFAULT_VOLUME = 0.5;

  private howl: Howl;

  private constructor(src: string) {
    this.howl = new Howl({
      src: [src],
      loop: true,
      volume: BGMPlayer.DEFAULT_VOLUME
    });
  }

  static create(): BGMPlayer {
    const randomIndex = Math.floor(Math.random() * BGMPlayer.BGM_FILES.length);
    const selectedBGM = BGMPlayer.BGM_FILES[randomIndex];
    return new BGMPlayer(selectedBGM);
  }

  play(): void {
    this.howl.play();
  }

  pause(): void {
    this.howl.pause();
  }

  stop(): void {
    this.howl.stop();
  }

  setVolume(volume: number): void {
    this.howl.volume(volume);
  }
}
