<script lang="ts">
  interface Props {
    Icon: any;
    small?: boolean;
    disabled?: boolean;
    onclick?: () => void;
    children?: () => any;
    selected?: boolean;
  }
  let {
    small,
    Icon,
    onclick,
    children,
    disabled = false,
    selected,
  }: Props = $props();
</script>

<button
  class={[
    "inline-flex items-center justify-center rounded-full",
    small ? "px-2 py-1 gap-1" : "px-4 py-1 gap-2",
    selected ? "bg-green-200 text-green-800" : "bg-indigo-100 text-indigo-700",
  ]}
  {onclick}
  disabled={!onclick || disabled}
>
  <Icon size={small ? 14 : 16} />
  <p class={["whitespace-nowrap", small ? "text-xs font-medium" : "text-sm"]}>
    {@render children?.()}
  </p>
</button>
