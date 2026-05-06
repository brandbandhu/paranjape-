let appPromise;

async function getApp() {
  appPromise ??= import("../dist/server/index.js").then((mod) => mod.default);
  return appPromise;
}

function toAppRequest(request) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path");

  if (path) {
    url.pathname = `/${path}`;
    url.searchParams.delete("path");
  } else {
    url.pathname = "/";
  }

  return new Request(url, request);
}

export default {
  async fetch(request) {
    const app = await getApp();
    return app.fetch(toAppRequest(request));
  },
};
