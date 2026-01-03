<script lang="ts">
  import { onMount } from 'svelte';
  import { BGMPlayer } from '../lib/audio';

  let bgmPlayer: BGMPlayer;
  let isMuted = true;
  let volume = 0.5;

  onMount(() => {
    bgmPlayer = BGMPlayer.create();
    bgmPlayer.play();
  });

  function toggleMute() {
    isMuted = bgmPlayer.toggleMute();
  }

  function handleVolumeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    volume = parseFloat(target.value);
    bgmPlayer.setVolume(volume);
  }
</script>

<div class="volume-controls">
  <button class="mute-button" on:click={toggleMute}>
    {isMuted ? '🔇' : '🔊'}
  </button>
  <input
    type="range"
    class="volume-slider"
    min="0"
    max="1"
    step="0.01"
    bind:value={volume}
    on:input={handleVolumeChange}
  />
</div>

<style>
  .volume-controls {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    gap: 10px;
  }

  .mute-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .volume-slider {
    width: 100px;
  }
</style>
