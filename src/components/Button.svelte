<script lang="ts">
  interface Props {
    text: string;
    onclick?: () => void;
  }

  let { text, onclick }: Props = $props();
</script>

<button onclick={onclick}>
  {text}
</button>

<style>
  button {
    padding: 10px 30px;
    border: 1px solid #444;
    background: #222;
    color: #fff;
    cursor: pointer;
  }

  button:hover {
    background: #333;
  }
</style>
