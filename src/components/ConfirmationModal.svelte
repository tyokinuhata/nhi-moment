<script lang="ts">
  import { anomalyStore } from '../lib/stores/anomalyStore';

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
      <button class="btn btn-yes" on:click={handleYes}>はい</button>
      <button class="btn btn-no" on:click={handleNo}>いいえ</button>
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

  .btn {
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #444;
    background: #222;
    color: #fff;
    cursor: pointer;
  }

  .btn:hover {
    background: #333;
  }
</style>
