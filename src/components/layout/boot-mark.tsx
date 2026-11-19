import { SiteImage } from "@/components/media/site-image";

export function BootMark({ percent }: { percent?: number }) {
  const live = typeof percent === "number";
  const value = live ? Math.max(0, Math.min(100, Math.round(percent))) : 0;

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
      <div className="boot-meter">
        <div
          className={live ? "boot-bar is-live" : "boot-bar"}
          role={live ? "progressbar" : undefined}
          aria-hidden={live ? undefined : "true"}
          aria-valuemin={live ? 0 : undefined}
          aria-valuemax={live ? 100 : undefined}
          aria-valuenow={live ? value : undefined}
          aria-label={live ? "Loading experience" : undefined}
        >
          <span className="boot-bar-fill" style={live ? { transform: `scaleX(${value / 100})` } : undefined} />
        </div>
        {live ? <p className="boot-percent">{`${value}%`}</p> : null}
      </div>
    </div>
  );
}
