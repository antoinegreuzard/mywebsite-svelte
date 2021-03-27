import slugify from "slugify";
import dateformat from "dateformat";
import timeline from "../../content/data.json"; // TODO: Why is this not ../../

const contents = Object.values(timeline)
  .filter(post => !post.WIP)
  .map(post => {
    return {
      title: post.title,
      eventType: post.eventType,
      hasContent: !!post.content,
      slug: slugify(post.title).toLowerCase(),
      date: post.date,
      prettyDate: dateformat(post.date, "mmmm yyyy"),
      blurb: post.blurb,
      repository: post.repository,
      website: post.website,
      thumbnailExt: post.thumbnailExt,
      tags: post.tags,
      thumbnail: post.thumbnail
        ? `timeline/${post.thumbnail}`
        : null
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export function get(_req) {
  // res.writeHead(200, {
  //   "Content-Type": "application/json"
  // });
  return { body: contents };
}
