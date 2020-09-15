export function range(start, end) {
  if (start > end) throw new Error('The begining is higher then the end!');

  if (start === end) return [start];
  return [start, ...range(start + 1, end)];
}
