import { BootMark } from "@/components/layout/boot-mark";

export function PageLoading() {
  return (
    <div className="boot-loader boot-loader-inline" aria-busy="true" aria-live="polite" role="status">
      <BootMark />
    </div>
  );
}
