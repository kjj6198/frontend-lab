
export function clamp(value, min, max) {
  return Math.min(
    Math.max(value, Math.min(min, max)),
    Math.max(min, max),
  );
}

export function rgb(r, g, b) {
  return `rgb(${clamp(Math.round(r), 0, 255)}, ${clamp(Math.round(g), 0, 255)}, ${clamp(Math.round(b), 0, 255)})`;
}


export function hsl(h, s, l) {
  return `hsl(${h}, ${clamp(s, 0, 100)}%, ${clamp(l, 0, 100)}%)`;
}
