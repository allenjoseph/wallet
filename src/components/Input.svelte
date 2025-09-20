<script lang="ts">
  let { name, type = "text", placeholder = "", value = $bindable() } = $props();
</script>

<div>
  <label class="sr-only" for={name}>Name</label>
  <input
    {type}
    {name}
    bind:value
    placeholder={placeholder || name.charAt(0).toUpperCase() + name.slice(1)}
    class="w-full rounded-lg border-gray-200 p-3 focus:border-indigo-600 focus:outline-hidden focus:ring-0"
  />
</div>
