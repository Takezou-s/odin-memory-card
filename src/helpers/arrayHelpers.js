export function shuffle(arr) {
  const arrCopy = [...arr];
  const result = [];
  const length = arrCopy.length;
  while (arrCopy.length > 0) {
    const element = arrCopy.shift();
    let newIndex = getRandom(0, length);
    while (result[newIndex] !== undefined) {
      newIndex = getRandom(0, length);
    }
    result[newIndex] = element;
  }
  return result.filter((x) => x);
}

function getRandom(lower, upper, int = true) {
  let num = Math.random() * (upper - lower) + lower;
  num = int ? Math.floor(num) : num;
  return num;
}
