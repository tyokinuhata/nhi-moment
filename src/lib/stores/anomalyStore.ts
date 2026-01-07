import { writable } from 'svelte/store';

type Screen = 'game' | 'modal' | 'result';

export interface AnomalyState {
  screen: Screen;
  isAnomaly: boolean | null;
  isAccepted: boolean | null;
}

const initialState: AnomalyState = {
  screen: 'game',
  isAnomaly: null,
  isAccepted: null
};

function createAnomalyStore() {
  const { subscribe, set, update } = writable<AnomalyState>(initialState);

  return {
    subscribe,

    openModal: (isAnomaly: boolean, isAccepted: boolean) => {
      update(state => ({
        ...state,
        screen: 'modal',
        isAnomaly,
        isAccepted
      }));
    },

    closeModal: () => {
      update(state => ({ ...state, screen: 'game' }));
    },

    showResult: () => {
      update(state => ({ ...state, screen: 'result' }));
    },

    reset: () => {
      set(initialState);
    }
  };
}

export const anomalyStore = createAnomalyStore();
