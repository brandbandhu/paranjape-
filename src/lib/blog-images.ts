import heroStory from "@/assets/hero-story.jpg";
import { blogImagePaths } from "@/data/blogImagePaths";
import type { BlogPost } from "@/lib/content.types";

function usesUnstableBundledPath(image: string) {
  return (
    image.startsWith("/src/assets/") ||
    image.startsWith("src/assets/") ||
    image.startsWith("@/assets/") ||
    image.startsWith("/assets/")
  );
}

export function resolveBlogImage(post: Pick<BlogPost, "slug" | "image" | "source">) {
  const staticImage = blogImagePaths[post.slug];
  const currentImage = post.image.trim();

  if (staticImage && (post.source !== "database" || usesUnstableBundledPath(currentImage))) {
    return staticImage;
  }

  return currentImage || staticImage || heroStory;
}
