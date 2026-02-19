<script lang="ts">
let { children } = $props();
</script>

<div class="card card-primary flex flex-col gap-4">
  {@render children?.()}
</div>

<style lang="postcss">
  @reference "../../app.css";
  .card-primary {
    @apply border-indigo-100 shadow-indigo-300;
  }
</style>
