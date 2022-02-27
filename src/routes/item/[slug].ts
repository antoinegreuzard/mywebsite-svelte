import sizeOf from "image-size";
// import type { RequestEvent } from "@sveltejs/kit";
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
  .filter(({ contents, WIP }) => contents && !WIP)
  .map((post) => ({
    blurb: post.blurb,
    contents: post.contents,
    date: {
      start: post.date,
      end: post.endDate,
      isOngoing: post.isOngoing ?? false,
      isSeasonal: post.isSeasonal ?? false,
    },
    embed: post.embed,
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

export function get(req) {
  // the `slug` parameter is available because this file is called [slug].js
  const slug = req.params.slug.toLowerCase();

  if (lookup.has(slug)) {
    return {
      body: { post: lookup.get(slug), brandColors },
    };
  }
  return {
    body: { message: "Not found", post: null, brandColors },
  };
}
