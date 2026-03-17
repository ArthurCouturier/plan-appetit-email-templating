export function buildUtmUrl(
  basePath: string,
  campaign: string,
  content: string
): string {
  const base = basePath.startsWith("http")
    ? basePath
    : `https://plan-appetit.fr${basePath}`;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}utm_source=email&utm_medium=newsletter&utm_campaign=${campaign}&utm_content=${content}`;
}
