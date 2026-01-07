<script lang="ts">
  import { anomalyStore } from '../lib/stores/anomalyStore';
  import Button from './Button.svelte';

  function handleYes() {
    anomalyStore.showResult();
  }

  function handleNo() {
    anomalyStore.closeModal();
  }
</script>

<div class="modal-overlay">
  <div class="modal-content">
    <h2 class="modal-title">怪異を報告しますか？</h2>
    <div class="button-group">
      <Button text="はい" onclick={handleYes} />
      <Button text="いいえ" onclick={handleNo} />
    </div>
  </div>
</div>

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    padding: 30px 30px;
    text-align: center;
  }

  .modal-title {
    color: #fff;
    margin-bottom: 25px;
  }

  .button-group {
    display: flex;
    gap: 15px;
    justify-content: center;
  }
</style>
