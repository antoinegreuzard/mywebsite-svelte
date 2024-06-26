<script lang="ts">
  import type { PostItemStub, TagColors } from "$lib/types";

  import Tag from "$lib/components/Tag.svelte";
  import { remsToPixels } from "$lib/functions";

  export let tagColors: TagColors;
  export let post: PostItemStub;
  export let isPageBackgroundDark: boolean;
  export let activeTags: Set<string>;
</script>

<div class="post-heading">
  <div class="picture-frame">
    {#if post.thumbnail}
      <picture
        class="transition-colors"
        class:border={post.thumbnail.showBorder}
      >
        <source
          srcset="/timeline/{post.thumbnail.name}.webp"
          type="image/webp"
        />
        <source
          srcset="/timeline/{post.thumbnail.name}.{post.thumbnail.extension}"
          type="image/{post.thumbnail.extension}"
        />
        <img
          src="/timeline/{post.thumbnail.name}.{post.thumbnail.extension}"
          loading="lazy"
          alt={post.title}
          width={remsToPixels(1.7)}
          height={remsToPixels(1.7)}
        />
      </picture>
    {/if}
  </div>
  <div class="heading-and-tags">
    <h3>
      {#if post.hasContent}
        <a
          data-sveltekit-preload-data
          data-testid="post-stub-link-{post.slug}"
          href="item/{post.slug}"
        >
          {post.title}
        </a>
      {:else}{post.title}{/if}
    </h3>
    <div class="tags">
      {#each post.tags as tagId}
        <Tag
          {tagId}
          background={tagColors[tagId]?.bg}
          foreground={tagColors[tagId]?.fg}
          active={activeTags.has(tagId)}
          {isPageBackgroundDark}
          needsOutlineOnLightBg={tagColors[tagId]?.outlineOnLight}
          needsOutlineOnDarkBg={tagColors[tagId]?.outlineOnDark}
          lazyLoad
        />
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  div.post-heading {
    display: flex;
    min-height: 1.5rem;
    align-items: center;

    .picture-frame {
      width: 2rem;
      height: 2rem;
      flex-shrink: 0;

      picture {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;

        &.border {
          border: 1px solid var(--color-border);
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    div.heading-and-tags {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      h3 {
        font-size: var(--font-size-s);
        display: inline-block;
        margin: 0 var(--spacing-2xs) 0 var(--spacing-s);
        padding: 0;

        a {
          color: var(--color-heading);
          text-decoration: underline !important;
        }
      }

      div.tags {
        display: flex;
        padding: var(--spacing-3xs) 0;
        margin-left: var(--spacing-s);
        flex-wrap: wrap;
      }
    }
  }
</style>
