import type { ImgHTMLAttributes } from "react";

type SiteImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean;
};

export const IMAGE_CACHE_TAG = "v=13";

function withCache(src: string | undefined) {
  if (!src || src.startsWith("http") || src.startsWith("data:")) return src;
  if (src.includes(IMAGE_CACHE_TAG)) return src;
  return src.includes("?") ? `${src}&${IMAGE_CACHE_TAG}` : `${src}?${IMAGE_CACHE_TAG}`;
}

function toWebpPath(src: string) {
  const [path, query] = src.split("?");
  if (!/\.(jpe?g|png)$/i.test(path)) return src;
  const webp = path.replace(/\.(jpe?g|png)$/i, ".webp");
  return query ? `${webp}?${query}` : webp;
}

export function siteImageSrc(src: string | undefined) {
  if (!src || src.startsWith("http") || src.startsWith("data:")) return src;
  return withCache(toWebpPath(src));
}

export function LcpPreload({ src }: { src: string }) {
  const href = siteImageSrc(src);
  if (!href) return null;
  return <link rel="preload" href={href} as="image" type="image/webp" fetchPriority="high" />;
}

export function SiteImage({
  alt = "",
  src,
  priority = false,
  loading,
  decoding,
  fetchPriority,
  ...props
}: SiteImageProps) {
  const href = typeof src === "string" ? siteImageSrc(src) : undefined;
  return (
    <img
      alt={alt}
      src={href}
      loading={loading ?? (priority || fetchPriority === "high" ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      fetchPriority={fetchPriority ?? (priority ? "high" : "low")}
      {...props}
    />
  );
}
