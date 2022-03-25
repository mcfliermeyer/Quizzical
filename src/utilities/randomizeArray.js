export default function randomizeArray(array) {
  if (array.length === 1) {
    return array;
  }
  const randomArrayElement = array[Math.floor(Math.random() * array.length)];
  const removedElementArray = array.filter((e) => e !== randomArrayElement);
  return [randomArrayElement, ...randomizeArray(removedElementArray)];
}
