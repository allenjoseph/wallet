<script lang="ts">
  interface Props {
    Icon: any;
    small?: boolean;
    click?: () => void;
    children?: () => any;
  }
  let { small, Icon, click, children }: Props = $props();
</script>

<div class="relative">
  <button
    class={[
      "inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700",
      small ? "px-2 py-1 gap-1" : "px-4 py-1 gap-2",
    ]}
    onclick={click}
  >
    <Icon size={small ? 14 : 16} />
    <p class={["whitespace-nowrap", small ? "text-xs font-medium" : "text-sm"]}>
      {@render children?.()}
    </p>
  </button>
</div>
