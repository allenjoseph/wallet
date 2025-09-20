<script lang="ts">
  let { children } = $props();
</script>

<span class="relative flex justify-center">
  <div
    class="absolute inset-x-0 top-1/2 h-px translate-y-1/2 bg-transparent bg-linear-to-r from-transparent via-gray-300 to-transparent opacity-75"
  ></div>

  <span class="relative z-10 bg-white px-2 text-sm text-gray-500">
    {@render children?.()}
  </span>
</span>
