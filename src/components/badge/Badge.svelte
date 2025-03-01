<script lang="ts">
  interface Props {
    Icon: any;
    small?: boolean;
    disabled?: boolean;
    onclick?: () => void;
    children?: () => any;
    selected?: boolean;
    outline?: boolean;
    secondary?: boolean;
  }
  let {
    small,
    Icon,
    onclick,
    children,
    disabled = false,
    selected,
    outline,
    secondary,
  }: Props = $props();
</script>

<button
  class={[
    "inline-flex items-center justify-center rounded-full",
    small ? "px-2 py-1 gap-1" : "px-3 py-1 gap-2",
    selected
      ? "bg-green-200 text-green-800 border border-green-200"
      : disabled
        ? "bg-gray-100 text-gray-400 border border-gray-100"
        : outline
          ? "bg-transparent text-indigo-700 border border-indigo-700"
          : secondary
            ? "bg-gray-100 text-gray-800 border border-gray-100"
            : "bg-indigo-100 text-indigo-700 border border-indigo-100",
  ]}
  {onclick}
  disabled={!onclick || disabled}
>
  <Icon size={small ? 14 : 16} />
  <p class={["whitespace-nowrap", small ? "text-xs font-medium" : "text-sm"]}>
    {@render children?.()}
  </p>
</button>
