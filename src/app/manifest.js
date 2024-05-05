/* eslint-disable camelcase */
export default function manifest() {
  return {
    name: "City Review",
    short_name: "cityRev",
    description: "Find the best places around the world",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
