<script lang="ts">
  import Button from "../components/Button.svelte";
  import Input from "../components/Input.svelte";
  import View from "../components/View.svelte";
  import { deleteCategory, getCategories, saveCategory } from "../lib/backend";
  import Divider from "../components/Divider.svelte";
  import CategoryCard from "../components/Card.svelte";
  import type { BaseDoc } from "../lib/types";
  import { loaderDecorator } from "../lib/utils";

  let category = $state<BaseDoc>({ name: "", description: "" });
  let categories$ = $state(getCategories());

  async function onSave() {
    await saveCategory({ ...category });
    category = { name: "", description: "" };
    categories$ = getCategories();
  }

  async function onEdit(item: BaseDoc) {
    category = { ...item };
  }

  async function onDelete(id: string) {
    await deleteCategory(id);
    categories$ = getCategories();
  }
</script>

<View>
  <Divider>Add / Edit</Divider>
  <div class="flex flex-col gap-4">
    <Input name="name" bind:value={category.name} />
    <Input name="description" bind:value={category.description} />
    <Button onClick={loaderDecorator(onSave)}>Save</Button>
  </div>

  <Divider>Last categories</Divider>
  {#await categories$}
    <small class="text-gray-600">Loading...</small>
  {:then categories}
    {#if categories.length === 0}
      <small class="text-gray-600">No categories found.</small>
    {/if}
    {#each categories as category}
      <CategoryCard
        {...category}
        onedit={() => onEdit(category)}
        ondelete={loaderDecorator(() => onDelete(category.id!))}
      />
    {/each}
  {/await}
</View>
