export function addDelay(arr: string[], delay: number) {
  const newArray = [];
  for (let i = 0; i < arr.length; i++) {
    newArray.push(arr[i]);
    newArray.push(delay);
  }
  return newArray;
}
