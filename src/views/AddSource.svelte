<script lang="ts">
  import Button from "../components/Button.svelte";
  import Input from "../components/Input.svelte";
  import View from "../components/View.svelte";
  import { deleteSource, getSources, saveSource } from "../lib/backend";
  import Divider from "../components/Divider.svelte";
  import SourceCard from "../components/Card.svelte";
  import type { BaseDoc } from "../lib/types";
  import { loaderDecorator } from "../lib/utils";

  let source = $state<BaseDoc>({ name: "", description: "" });
  let sources$ = $state(getSources());

  async function onSave() {
    await saveSource({ ...source });
    source = { name: "", description: "" };
    sources$ = getSources();
  }

  async function onEdit(source: BaseDoc) {
    source = { ...source };
  }

  async function onDelete(id: string) {
    await deleteSource(id);
    sources$ = getSources();
  }
</script>

<View>
  <h1 class="text-2xl font-medium">Source</h1>

  <div class="flex flex-col gap-4">
    <Input name="name" bind:value={source.name} />
    <Input name="description" bind:value={source.description} />
    <Button onClick={loaderDecorator(onSave)}>Save</Button>
  </div>

  <Divider>Last sources</Divider>
  {#await sources$}
    <small class="text-gray-600">Loading...</small>
  {:then sources}
    {#if sources.length === 0}
      <small class="text-gray-600">No sources found.</small>
    {/if}
    {#each sources as source}
      <SourceCard
        {...source}
        onedit={() => onEdit(source)}
        ondelete={() => onDelete(source.id!)}
      />
    {/each}
  {/await}
</View>
