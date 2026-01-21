<script lang="ts">
  import Button from "../components/Button.svelte";
  import Input from "../components/Input.svelte";
  import View from "../components/View.svelte";
  import Divider from "../components/Divider.svelte";
  import Card from "../components/card/Card.svelte";
  import { loaderDecorator } from "../utils";
  import MainCard from "../components/card/MainCard.svelte";
  import ChevronButton from "../components/chevron/ChevronButton.svelte";
  import { sourceRepo } from "../repositories";
  import type { Source } from "../entities";

  let showForm = $state(false);
  let source = $state<Source>({ name: "", description: "" });
  let sources$ = $state(sourceRepo.getAll());

  let isInvalid = $derived(!source.name || !source.description);

  async function onSave() {
    await sourceRepo.save({ ...source });
    source = { name: "", description: "" };
    sources$ = sourceRepo.getAll();
  }

  function onEdit(item: Source) {
    source = { ...item };
    showForm = true;
    scrollTo(0, 0);
  }

  async function onDelete(id: string) {
    await sourceRepo.delete(id);
    sources$ = sourceRepo.getAll();
  }

  function onCancel() {
    source = { name: "", description: "" };
    showForm = false;
  }
</script>

<View>
  <Divider>Add / Edit</Divider>
  {#if showForm}
    <MainCard>
      <Input name="name" bind:value={source.name} />
      <Input name="description" bind:value={source.description} />
      <Input
        name="limit"
        type="number"
        inputmode="decimal"
        bind:value={source.limit}
      />
      <footer class="self-end flex gap-2">
        <Button onClick={onCancel} secondary>Cancel</Button>
        <Button onClick={loaderDecorator(onSave)} disabled={isInvalid}>
          Save
        </Button>
      </footer>
    </MainCard>
  {/if}
  <ChevronButton open={showForm} toggle={() => (showForm = !showForm)} />

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
