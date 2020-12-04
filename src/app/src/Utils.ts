export function range(
  from: number,
  to: number,
  step: number = 1
): Array<number> {
  return [...Array(Math.floor((to - from) / step) + 1)].map(
    (_, i) => from + i * step
  );
}
