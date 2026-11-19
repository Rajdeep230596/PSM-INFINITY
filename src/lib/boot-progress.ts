type Listener = (percent: number) => void;

const totals = new Map<string, number>();
const loaded = new Map<string, number>();
const listeners = new Set<Listener>();
let displayed = 0;

function emit() {
  let received = 0;
  let expected = 0;
  for (const [id, total] of totals) {
    expected += total;
    received += Math.min(loaded.get(id) ?? 0, total);
  }
  const next = expected > 0 ? Math.min(100, (received / expected) * 100) : 0;
  displayed = Math.max(displayed, next);
  const rounded = Math.min(100, Math.floor(displayed + Number.EPSILON));
  for (const listener of listeners) listener(rounded);
}

export function subscribeBootProgress(listener: Listener) {
  listeners.add(listener);
  listener(Math.min(100, Math.floor(displayed + Number.EPSILON)));
  return () => {
    listeners.delete(listener);
  };
}

export function resetBootProgress(assets: Array<{ id: string; bytes: number }>) {
  totals.clear();
  loaded.clear();
  displayed = 0;
  for (const asset of assets) {
    totals.set(asset.id, Math.max(1, asset.bytes));
    loaded.set(asset.id, 0);
  }
  emit();
}

export function reportBootBytes(id: string, bytes: number, total?: number) {
  if (total && total > 0) totals.set(id, total);
  const cap = totals.get(id) ?? Math.max(bytes, 1);
  const previous = loaded.get(id) ?? 0;
  loaded.set(id, Math.min(cap, Math.max(previous, bytes)));
  emit();
}

export function completeBootAsset(id: string) {
  const total = totals.get(id) ?? 1;
  totals.set(id, total);
  loaded.set(id, total);
  emit();
}

export function completeBootProgress() {
  for (const [id, total] of totals) loaded.set(id, total);
  displayed = 100;
  emit();
}
