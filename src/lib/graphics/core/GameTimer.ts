export class GameTimer {
  private startTime: number = 0;

  start(): void {
    this.startTime = Date.now();
  }

  isWithinTimeLimit(limitSeconds: number): boolean {
    return this.getElapsedSeconds() <= limitSeconds;
  }

  private getElapsedSeconds(): number {
    const currentTime = Date.now();
    return (currentTime - this.startTime) / 1000;
  }
}
