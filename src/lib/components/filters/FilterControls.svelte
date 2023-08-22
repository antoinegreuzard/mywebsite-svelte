<script lang="ts">
  import type { PostItemStub, TagColors } from "$lib/types";
  import { PostCategory, SiteTheme } from "$lib/types";
  import { minTagNumber, themeStore } from "$lib/stores";
  import Times from "~icons/fa-solid/times";

  import { browser } from "$app/environment";
  import { tagAncestors } from "$lib/tags";
  import { prefersColorSchemeDark } from "$lib/functions";
  import FilterButton from "$lib/components/filters/FilterButton.svelte";
  import Tag from "$lib/components/Tag.svelte";

  export let showCategories: Set<PostCategory>;
  export let showTags: Set<string>;
  export let posts: PostItemStub[] = [];
  export let tagColors: TagColors;

  function toggleItemInSet<T>(set: Set<T>, item: T): Set<T> {
    if (set.has(item)) {
      set.delete(item);
    } else {
      set.add(item);
    }
    return set;
  }

  const toggleCategory = (category: PostCategory): void => {
    showCategories = toggleItemInSet(showCategories, category);
  };

  const toggleTag = (tag: string): void => {
    showTags = toggleItemInSet(showTags, tag);
  };

  $: jobActive = showCategories.has(PostCategory.Job);
  $: otherActive = showCategories.has(PostCategory.Other);
  $: projectActive = showCategories.has(PostCategory.Project);

  let tagsOrdered: string[];

  $: {
    const tagCounts: Record<string, number> = {};

    for (const { tags: postTags } of posts) {
      // for each tag in post, add 1 to count
      for (const tag of postTags) {
        tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
      }

      // get ancestors of each tag and remove duplicates
      const ancestorTags = [
        ...new Set(postTags.flatMap((tag) => tagAncestors[tag] ?? [])),
      ];

      for (const ancestorTag of ancestorTags.filter(
        (tag) => !postTags.includes(tag),
      )) {
        tagCounts[ancestorTag] = (tagCounts[ancestorTag] ?? 0) + 1; // add 1 to count for each ancestor
      }
    }

    tagsOrdered = Object.entries(tagCounts)
      .filter((tag) => tag[1] >= $minTagNumber)
      .sort((a, b) => {
        // order by tag count then alphanumerically
        if (a[1] < b[1]) {
          return 1;
        }
        if (a[1] > b[1]) {
          return -1;
        }
        return a[0] < b[0] ? -1 : 1;
      })
      .map((tag) => tag[0]);
  }

  $: isPageBackgroundDark =
    $themeStore === SiteTheme.Dark ||
    ($themeStore === SiteTheme.System && prefersColorSchemeDark(browser));
</script>

<div class="category-buttons">
  <FilterButton
    active={jobActive}
    classPrefix={PostCategory.Job}
    onClick={() => toggleCategory(PostCategory.Job)}
  >
    Emplois
  </FilterButton>
  <FilterButton
    active={projectActive}
    classPrefix={PostCategory.Project}
    onClick={() => toggleCategory(PostCategory.Project)}
  >
    Projets
  </FilterButton>
  <FilterButton
    active={otherActive}
    classPrefix={PostCategory.Other}
    onClick={() => toggleCategory(PostCategory.Other)}
  >
    Autres
  </FilterButton>
  {#if showCategories.size || showTags.size}
    <button
      data-testid="clear-filters"
      class="secondary-button do-transition"
      on:click={() => {
        showCategories.clear();
        showTags.clear();

        // Trigger reactive updates
        showCategories = showCategories;
        showTags = showTags;
      }}
    >
      <span class="symbol"><Times /></span> Vider les filtres
    </button>
  {/if}
</div>
<div class="tag-buttons" class:truncated={$minTagNumber !== 0}>
  {#each tagsOrdered as tag}
    <Tag
      tagId={tag}
      active={showTags.has(tag)}
      background={tagColors[tag]?.bg}
      foreground={tagColors[tag]?.fg}
      {isPageBackgroundDark}
      needsOutlineOnLightBg={tagColors[tag]?.outlineOnLight ?? false}
      needsOutlineOnDarkBg={tagColors[tag]?.outlineOnDark ?? false}
      onClick={() => toggleTag(tag)}
    />
  {/each}
  {#if $minTagNumber !== 0}
    <button
      data-testid="show-more-tags"
      class="secondary-button do-transition"
      on:click={() => {
        $minTagNumber = 0;
      }}
    >
      Afficher la suite...
    </button>
  {/if}
</div>

<style>
  .category-buttons {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .tag-buttons {
    margin-top: var(--spacing-s);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .secondary-button {
    background: none;
    padding: 0 0 var(--spacing-3xs);
    border: none;
    border-bottom: 1px solid var(--color-subtitle);
    border-radius: 0;
    color: var(--color-subtitle);
    font-size: var(--font-size-2xs);
    margin: var(--spacing-2xs) var(--spacing-xs) var(--spacing-2xs) 0;
    display: inline-flex;
    align-items: center;
  }

  .secondary-button .symbol {
    position: static;
    display: inline-flex;
    align-items: center;
    margin-right: var(--spacing-2xs);
    font-size: var(--font-size-3xs);
  }

  .tag-buttons.truncated :global(.tag:nth-last-child(2)) {
    margin-right: var(--spacing-s);
  }
</style>