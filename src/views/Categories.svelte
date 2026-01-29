<script lang="ts">
  import Button from "../components/Button.svelte";
  import Input from "../components/Input.svelte";
  import View from "../components/View.svelte";
  import Divider from "../components/Divider.svelte";
  import Card from "../components/card/Card.svelte";
  import { getTotalLimit, loaderDecorator } from "../utils";
  import MainCard from "../components/card/MainCard.svelte";
  import ChevronButton from "../components/chevron/ChevronButton.svelte";
  import { categoryRepo } from "../repositories";
  import type { Category } from "../entities";

  let showForm = $state(false);
  let category = $state<Category>({ name: "", description: "" });
  let categories$ = $state(categoryRepo.getAll());

  let isInvalid = $derived(!category.name || !category.description);

  async function onSave() {
    await categoryRepo.save({ ...category });
    category = { name: "", description: "" };
    categories$ = categoryRepo.getAll();
  }

  async function onEdit(item: Category) {
    category = { ...item };
    showForm = true;
    scrollTo(0, 0);
  }

  async function onDelete(id: string) {
    await categoryRepo.delete(id);
    categories$ = categoryRepo.getAll();
  }

  function onCancel() {
    category = { name: "", description: "" };
    showForm = false;
  }
</script>

<View>
  <Divider>Add / Edit</Divider>
  {#if showForm}
    <MainCard>
      <Input name="name" bind:value={category.name} />
      <Input name="description" bind:value={category.description} />
      <Input
        name="limit"
        type="number"
        inputmode="decimal"
        bind:value={category.limit}
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

  <Divider>All categories</Divider>
  {#await categories$}
    <small class="text-gray-600">Loading...</small>
  {:then categories}
    {#if categories.length === 0}
      <small class="text-gray-600">No categories found.</small>
    {:else}
      <small class="text-gray-600">
        {categories.length} categories found. Limit: S/ {getTotalLimit(
          categories,
        )}
      </small>
    {/if}
    {#each categories as item}
      <Card
        {...item}
        onedit={() => onEdit(item)}
        ondelete={loaderDecorator(() => onDelete(item.id!))}
      />
    {/each}
  {/await}
</View>
