import { Application, DisplacementFilter, Graphics, RenderTexture, Sprite, Ticker } from 'pixi.js';

export function setupDisplacementFilter(app: Application) {
  const MAP_W = 256;
  const MAP_H = 256;

  const g = new Graphics();
  g.rect(0, 0, MAP_W, MAP_H);
  g.fill({ color: 0x808080 });

  for (let y = 0; y < MAP_H; ) {
    const jitter = (Math.random() - 0.5) * 50;
    const gray = Math.max(0, Math.min(255, 128 + jitter));
    const c = (gray << 16) | (gray << 8) | gray;
    const h = 2 + Math.floor(Math.random() * 4);
    g.rect(0, y, MAP_W, h);
    g.fill({ color: c });
    y += h;

    if (Math.random() < 0.05) {
      const bigH = 4 + Math.floor(Math.random() * 10);
      g.rect(0, y, MAP_W, bigH);
      g.fill({ color: 0x9a9a9a });
      y += bigH;
    }
  }

  const rt = RenderTexture.create({ width: MAP_W, height: MAP_H });
  app.renderer.render({ container: g, target: rt, clear: true });

  const dispSprite = new Sprite(rt);
  dispSprite.texture.source.style.addressMode = 'repeat';
  dispSprite.width = app.screen.width;
  dispSprite.height = app.screen.height;
  dispSprite.visible = false;
  app.stage.addChild(dispSprite);

  const displacementFilter = new DisplacementFilter({
    sprite: dispSprite,
    scale: { x: 18, y: 1.5 }
  });

  const BASE_X = 18;
  const BASE_Y = 1.5;

  return { displacementFilter, dispSprite, BASE_X, BASE_Y };
}

export function updateDisplacementFilter(ticker: Ticker, dispSprite: Sprite, displacementFilter: DisplacementFilter, BASE_X: number, BASE_Y: number) {
  const dt = ticker.deltaMS / 1000;

  dispSprite.x += 60 * dt;
  dispSprite.y += 10 * dt;

  if (Math.random() < 0.02) {
    displacementFilter.scale.x = 28;
  }

  const k = 1 - Math.pow(0.02, ticker.deltaMS / 16.67);
  displacementFilter.scale.x += (BASE_X - displacementFilter.scale.x) * k;
  displacementFilter.scale.y += (BASE_Y - displacementFilter.scale.y) * k;
}
