import { Application, Container, NoiseFilter } from 'pixi.js';

/**
 * ノイズだけ（GPU生成）を適用し、VHSっぽい「たまに強くなる」ちらつきを入れる。
 *
 * - container に filters が既にあるなら append する
 * - ticker でノイズ強度を「たまに更新」し、指数平滑で滑らかに追従させる
 */
export function setupNoiseFilter(
  container: Container,
  options?: {
    base?: number;          // 通常時のノイズ強度
  }
) {
  const {
    base = 0.06,
  } = options ?? {};

  const noise = new NoiseFilter({ noise: base });

  // 既存filtersがあれば維持して後ろに追加
  const current = container.filters ?? [];
  container.filters = [...current, noise];

  // 目標値（たまに跳ねる）
  let target = base;

  return { noise, target };
}

export function updateNoiseFilter(app: Application, noiseData: { noise: NoiseFilter; target: number }, options?: {
  base?: number;
  burstMin?: number;
  burstMax?: number;
  burstProb?: number;
  smoothTauMs?: number;
}) {
  const {
    base = 0.06,
    burstMin = 0.10,
    burstMax = 0.20,
    burstProb = 0.04,
    smoothTauMs = 120,
  } = options ?? {};

  // たまにノイズが強くなる（VHSの一瞬の荒れ）
  if (Math.random() < burstProb) {
    noiseData.target = burstMin + Math.random() * (burstMax - burstMin);
  } else {
    // 通常は基準値へ戻す
    noiseData.target = base;
  }

  // deltaMS に応じて平滑化（フレームレート依存を抑える）
  // 指数平滑: y += (x - y) * k
  // k = 1 - exp(-dt/tau)
  const dt = app.ticker.deltaMS;
  const k = 1 - Math.exp(-dt / smoothTauMs);

  noiseData.noise.noise += (noiseData.target - noiseData.noise.noise) * k;
}
