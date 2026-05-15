import { createFileRoute } from "@tanstack/react-router";
import { fetchPublicTourBySlug } from "@/lib/content.server";
import { parseDataImageUrl } from "@/lib/tour-images.server";

export const Route = createFileRoute("/tours/$slug/share-image")({
  component: undefined,
  server: {
    handlers: {
      GET: async ({ params }) => {
        const tour = await fetchPublicTourBySlug(params.slug);

        if (!tour) {
          return new Response("Tour image not found.", { status: 404 });
        }

        const parsedImage = parseDataImageUrl(tour.image);
        if (!parsedImage) {
          return new Response("Tour image is not stored as an embedded upload.", { status: 404 });
        }

        return new Response(parsedImage.bytes, {
          headers: {
            "Content-Type": parsedImage.contentType,
            "Cache-Control": "public, max-age=0, s-maxage=86400, must-revalidate",
          },
        });
      },
    },
  },
});
