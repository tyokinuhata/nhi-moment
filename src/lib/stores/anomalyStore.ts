import { writable } from 'svelte/store';
import type { GraphicsApp } from '../graphics/core/GraphicsApp';

interface AnomalyState {
  showModal: boolean;
  showResultScreen: boolean;
  isAnomaly: boolean | null;
  clickPosition: { x: number; y: number } | null;
}

const initialState: AnomalyState = {
  showModal: false,
  showResultScreen: false,
  isAnomaly: null,
  clickPosition: null
};

function createAnomalyStore() {
  const { subscribe, set, update } = writable<AnomalyState>(initialState);

  let graphicsAppInstance: GraphicsApp | null = null;

  return {
    subscribe,

    openModal: (isAnomaly: boolean, position: { x: number; y: number }) => {
      update(state => ({
        ...state,
        showModal: true,
        isAnomaly,
        clickPosition: position
      }));
    },

    closeModal: () => {
      update(state => ({ ...state, showModal: false }));
    },

    showResult: () => {
      update(state => ({
        ...state,
        showModal: false,
        showResultScreen: true
      }));
    },

    reset: () => {
      set(initialState);
    },

    setGraphicsApp: (app: GraphicsApp) => {
      graphicsAppInstance = app;
    },

    restartGame: async () => {
      if (graphicsAppInstance) {
        set(initialState);
        await graphicsAppInstance.restartGame();
      }
    }
  };
}

export const anomalyStore = createAnomalyStore();
