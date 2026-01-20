<script lang="ts">
  interface Props {
    name: string;
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string | number;
    min?: number;
    inputmode?: any;
  }

  let {
    name,
    label,
    type = "text",
    placeholder = "",
    value = $bindable(),
    ...rest
  }: Props = $props();

  const _label = $derived(
    label ?? name.charAt(0).toUpperCase() + name.slice(1),
  );
</script>

<div>
  <label class="sr-only" for={name}> {_label}</label>
  <input
    {type}
    id={name}
    bind:value
    placeholder={placeholder || _label}
    class="w-full rounded-lg border-gray-200 p-3 focus:border-indigo-600 focus:outline-hidden focus:ring-0"
    autocomplete="off"
    {...rest}
  />
</div>
