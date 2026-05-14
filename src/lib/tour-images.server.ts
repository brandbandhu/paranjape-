import { isDataImageUrl } from "@/lib/tour-images";

export function parseDataImageUrl(value: string) {
  const trimmed = value.trim();
  const match = trimmed.match(/^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i);

  if (!match || !isDataImageUrl(trimmed)) {
    return null;
  }

  return {
    contentType: match[1],
    bytes: Buffer.from(match[2], "base64"),
  };
}
