import sizeOf from "image-size";
import { data as timeline } from "$data/posts.json";
import { slugify } from "$lib/functions";
import brandColors from "$data/brandColors.json";
import type { PostItem } from "$lib/types";

const getDimensions = (imageName: string, extension: string) => {
  const filePath = `src/assets/timeline/${imageName}.${extension}`;
  const dimensions = sizeOf(filePath);
  return { width: dimensions.width, height: dimensions.height, aspectRatio: dimensions.width / dimensions.height };
};

const posts: PostItem[] = Object.values(timeline)
  .filter(({ contents, isHidden }) => contents && !isHidden)
  .map((post) => ({
    contents: post.contents,
    date: {
      start: post.date,
      end: post.endDate,
      isOngoing: post.isOngoing ?? false,
      isSeasonal: post.isSeasonal ?? false,
    },
    embed: post.embed,
    excerpt: post.excerpt,
    image: post.image && {
      name: post.image,
      extension: post.imageExt ?? "png",
      ...getDimensions(post.image, post.imageExt ?? "png"),
    },
    repository: post.repository,
    slug: slugify(post.title),
    tags: post.tags ?? [],
    thumbnail: post.thumbnail && {
      name: post.thumbnail ?? `timeline/${post.thumbnail}`,
      extension: post.thumbnailExt ?? "png",
    },
    title: post.title,
    website: post.website,
  }));

const lookup: Map<string, PostItem> = new Map();
posts
  .filter((post) => post.contents)
  .forEach((post) => lookup.set(post.slug, post));

export function get({ locals, params }) {
  // the `slug` parameter is available because this file is called [slug].js
  const slug = params.slug.toLowerCase();

  if (lookup.has(slug)) {
    return {
      body: {
        post: lookup.get(slug),
        brandColors,
        theme: locals.theme,
      },
    };
  }
  return {
    body: {
      message: "Not found",
      post: null,
      brandColors,
      theme: locals.theme,
    },
  };
}