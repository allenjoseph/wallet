<script lang="ts">
  interface Props {
    title: string;
    Icon: any;
    selected: boolean;
    onSelect: () => void;
  }

  let { title, Icon, selected, onSelect }: Props = $props();
</script>

<button
  {title}
  type="button"
  class="w-full px-2"
  onclick={onSelect}
  disabled={selected}
>
  <div
    class={[
      "flex flex-col justify-center items-center gap-1",
      selected ? "text-indigo-600" : "text-gray-600 ",
    ]}
  >
    <Icon size={24} />
    <span class="text-xs">{title}</span>
  </div>
</button>
