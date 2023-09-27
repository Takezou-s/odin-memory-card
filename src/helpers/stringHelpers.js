export function kebabToLiteral(str, capitalize = false) {
  return str
    .split("-")
    .map((x) => (capitalize ? x.slice(0, 1).toUpperCase() + x.slice(1) : x))
    .join(" ");
}
