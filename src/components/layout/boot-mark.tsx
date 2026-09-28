import { SiteImage } from "@/components/media/site-image";

export function BootMark() {
  return (
    <div className="boot-mark">
      <SiteImage
        src="/brand/psm-infinity-logo.png"
        alt="PSM Infinity"
        className="boot-logo"
        width={258}
        height={155}
        priority
      />
      <div className="boot-bar" aria-hidden="true">
        <span className="boot-bar-fill" />
      </div>
    </div>
  );
}
