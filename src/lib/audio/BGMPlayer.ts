import { Howl } from 'howler';

export class BGMPlayer {
  private static readonly BGM_FILES = [
    `${import.meta.env.BASE_URL}audio/distant_apartment_drone_1.mp3`,
    `${import.meta.env.BASE_URL}audio/distant_apartment_drone_2.mp3`,
    `${import.meta.env.BASE_URL}audio/ghost_mall_pa_system_1.mp3`,
    `${import.meta.env.BASE_URL}audio/ghost_mall_pa_system_2.mp3`
  ];
  private static readonly DEFAULT_VOLUME = 0.5;
  private static readonly MUTED_VOLUME = 0;

  private howl!: Howl;
  private currentVolume: number = BGMPlayer.DEFAULT_VOLUME;
  private isMuted: boolean = true;

  private constructor() {}

  static create(): BGMPlayer {
    const player = new BGMPlayer();
    player.loadRandomTrack(false);
    return player;
  }

  private loadRandomTrack(autoPlay: boolean = true): void {
    const randomIndex = Math.floor(Math.random() * BGMPlayer.BGM_FILES.length);
    const selectedBGM = BGMPlayer.BGM_FILES[randomIndex];

    if (this.howl) {
      this.howl.unload();
    }

    this.howl = new Howl({
      src: [selectedBGM],
      loop: false,
      volume: this.isMuted ? BGMPlayer.MUTED_VOLUME : this.currentVolume,
      onend: () => this.loadRandomTrack(true)
    });

    if (autoPlay) {
      this.howl.play();
    }
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
    this.currentVolume = volume;
    if (!this.isMuted) {
      this.howl.volume(volume);
    }
  }

  getVolume(): number {
    return this.currentVolume;
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.howl.volume(this.isMuted ? BGMPlayer.MUTED_VOLUME : this.currentVolume);
    return this.isMuted;
  }

  getMuted(): boolean {
    return this.isMuted;
  }
}
