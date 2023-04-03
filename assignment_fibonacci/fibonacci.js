// returns a fibonacci number at "num" position
const fibonacci = (num) => {
  if (num < 2) return num
  return fibonacci(num - 2) + fibonacci(num - 1)
}

// returns an array of fibonacci numbers
const fibonacciV2 = (num, arr = [0, 1]) => {
  if (num <= 2) return arr
  arr.push(arr[arr.length - 1] + arr[arr.length - 2])
  return fibonacciV2(num - 1, arr)
}

console.log(fibonacci(5))
console.log(fibonacciV2(5))
