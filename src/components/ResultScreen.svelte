<script lang="ts">
  import { anomalyStore, type AnomalyState } from '../lib/stores/anomalyStore';
  import Button from './Button.svelte';
  import { onMount } from 'svelte';

  let state: AnomalyState | undefined;

  onMount(() => {
    const unsubscribe = anomalyStore.subscribe((value: AnomalyState) => {
      state = value;
    });
    return unsubscribe;
  });

  function handleNextGame() {
    window.location.reload();
  }
</script>

<div class="result-overlay">
  <div class="result-content">
    {#if state?.isAccepted}
      <h2 class="success">報告は受理されました</h2>
    {:else if state?.isAnomaly && !state?.isAccepted}
      <h2 class="timeout">報告は受理できませんでした</h2>
    {:else}
      <h2 class="failure">報告は受理されませんでした</h2>
    {/if}
    <Button text="監視に戻る" onclick={handleNextGame} />
  </div>
</div>

<style>
  .result-overlay {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .success {
    color: rgba(16, 153, 187, 1);
  }

  .failure {
    color: rgba(187, 80, 80, 0.9);
  }

  .timeout {
    color: rgba(200, 180, 80, 0.9);
  }
</style>
