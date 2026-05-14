const DEFAULT_SITE_ORIGIN = "https://www.paranjapetours.com";

function normalizeOrigin(value: string) {
  return value.trim().replace(/\/+$/, "");
}

export function getSiteOrigin() {
  const processEnv = typeof process !== "undefined" ? process.env : undefined;
  const configuredOrigin =
    processEnv?.PUBLIC_SITE_URL ||
    processEnv?.PUBLIC_SITE_ORIGIN ||
    processEnv?.SITE_URL ||
    processEnv?.VERCEL_PROJECT_PRODUCTION_URL ||
    processEnv?.VERCEL_URL;

  if (!configuredOrigin) {
    if (typeof window !== "undefined" && window.location.origin) {
      return normalizeOrigin(window.location.origin);
    }

    return DEFAULT_SITE_ORIGIN;
  }

  const normalized = configuredOrigin.startsWith("http")
    ? configuredOrigin
    : `https://${configuredOrigin}`;

  return normalizeOrigin(normalized);
}

export function toAbsoluteSiteUrl(pathOrUrl: string) {
  const value = pathOrUrl.trim();
  if (!value) {
    return getSiteOrigin();
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${getSiteOrigin()}${value.startsWith("/") ? value : `/${value}`}`;
}

export function buildTourPagePath(slug: string) {
  return `/tours/${slug}`;
}

export function buildTourShareImagePath(slug: string) {
  return `/tours/${slug}/share-image`;
}
