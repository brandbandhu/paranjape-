import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/gallery")({
  beforeLoad: () => {
    throw redirect({ to: "/shop" });
  },
  component: GalleryRedirect,
});

function GalleryRedirect() {
  return null;
}
