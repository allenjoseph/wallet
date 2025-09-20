<script lang="ts">
  let { children } = $props();
</script>

<div class="card card-primary flex flex-col gap-4">
  {@render children?.()}
</div>
