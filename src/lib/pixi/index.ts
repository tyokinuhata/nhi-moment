import { PixiApp } from './core/PixiApp';

export async function setup(canvasElement: HTMLDivElement): Promise<void> {
  await PixiApp.create(canvasElement);
}
