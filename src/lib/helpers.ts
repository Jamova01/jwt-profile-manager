export const toBool = (v: unknown) =>
  typeof v === "boolean" ? v : String(v || "").toLowerCase() === "true";

export const initials = (name?: string, last?: string) =>
  `${(name?.[0] || "").toUpperCase()}${(last?.[0] || "").toUpperCase()}` || "U";

export const normalizeUrl = (url?: string) => {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
};
