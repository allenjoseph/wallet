<script lang="ts">
  import Button from "../components/Button.svelte";
  import Input from "../components/Input.svelte";
  import View from "../components/View.svelte";
  import { deleteSource, getSources, saveSource } from "../lib/backend";
  import Divider from "../components/Divider.svelte";
  import Card from "../components/card/Card.svelte";
  import type { BaseDoc } from "../lib/types";
  import { loaderDecorator } from "../lib/utils";
  import MainCard from "../components/card/MainCard.svelte";

  let source = $state<BaseDoc>({ name: "", description: "" });
  let sources$ = $state(getSources());

  async function onSave() {
    await saveSource({ ...source });
    source = { name: "", description: "" };
    sources$ = getSources();
  }

  function onEdit(item: BaseDoc) {
    source = { ...item };
  }

  async function onDelete(id: string) {
    await deleteSource(id);
    sources$ = getSources();
  }
</script>

<View>
  <Divider>Add / Edit</Divider>
  <MainCard>
    <Input name="name" bind:value={source.name} />
    <Input name="description" bind:value={source.description} />
    <footer class="self-end">
      <Button onClick={loaderDecorator(onSave)}>Save</Button>
    </footer>
  </MainCard>

  <Divider>All sources</Divider>
  {#await sources$}
    <small class="text-gray-600">Loading...</small>
  {:then sources}
    {#if sources.length === 0}
      <small class="text-gray-600">No sources found.</small>
    {/if}
    {#each sources as item}
      <Card
        {...item}
        onedit={() => onEdit(item)}
        ondelete={loaderDecorator(() => onDelete(item.id!))}
      />
    {/each}
  {/await}
</View>
