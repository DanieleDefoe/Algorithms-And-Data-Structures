const merge = (left, right) => {
  const result = []
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  return [...result, ...left, ...right]
}

const mergeSort = (arr) => {
  if (arr.length < 2) return arr
  const half = parseInt(arr.length / 2, 10)
  const left = arr.splice(0, half)
  return merge(mergeSort(left), mergeSort(arr))
}

console.log(mergeSort([5, 2, 4, 1, 3]))
