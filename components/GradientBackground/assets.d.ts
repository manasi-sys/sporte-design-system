// Vite's `?inline` suffix imports a file as a base64 data URI string, so the
// published package is self-contained (no separate asset files to host).
declare module "*.svg?inline" {
  const src: string;
  export default src;
}
