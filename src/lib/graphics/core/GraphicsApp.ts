import { Application } from 'pixi.js';
import { Scene } from './Scene';
import { FadeTransition } from './FadeTransition';
import { FilterPipeline } from './FilterPipeline';
import { InteractiveViewport } from './InteractiveViewport';
import { anomalyStore } from '../../stores/anomalyStore';

export class GraphicsApp {
  private app!: Application;
  private interactiveViewport!: InteractiveViewport;
  private scene!: Scene;
  private fadeTransition!: FadeTransition;
  private filterPipeline!: FilterPipeline;

  private constructor() {}

  static async create(canvasElement: HTMLDivElement): Promise<GraphicsApp> {
    const graphicsApp = new GraphicsApp();
    await graphicsApp.init(canvasElement);
    return graphicsApp;
  }

  private async init(canvasElement: HTMLDivElement): Promise<void> {
    await this.setupApp(canvasElement);
    this.scene = await Scene.create(this.app);
    this.interactiveViewport = InteractiveViewport.create(this.app, this.scene);
    this.app.stage.addChild(this.interactiveViewport.getViewport());
    this.interactiveViewport.getViewport().addChild(this.scene.getContainer());
    this.filterPipeline = FilterPipeline.create(this.app, this.scene.getContainer());
    this.fadeTransition = FadeTransition.create(this.scene.getSpriteAfter());
    this.setupClickHandler();
    this.startAnimation();
  }

  private async setupApp(canvasElement: HTMLDivElement): Promise<void> {
    this.app = new Application();
    await this.app.init({
      background: '#1099bb',
      resizeTo: canvasElement
    });
    canvasElement.appendChild(this.app.canvas);
  }

  private setupClickHandler(): void {
    this.interactiveViewport.onImageClick((event) => {
      const isAnomaly = this.scene.isAnomalyClicked(event.x, event.y);
      anomalyStore.openModal(isAnomaly);
    });
  }

  private startAnimation(): void {
    this.app.ticker.add((ticker) => {
      this.filterPipeline.update(ticker);
      this.fadeTransition.update(ticker);
    });
  }
}
