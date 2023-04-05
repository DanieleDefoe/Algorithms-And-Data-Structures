/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const chessboardGraph = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
]

const len = chessboardGraph.length

class Node {
  constructor(topLeft, topRight, rightTop, rightBottom, bottomLeft, bottomRight, leftTop, leftBottom) {
    this.topLeft = topLeft
    this.topRight = topRight

    this.rightTop = rightTop
    this.rightBottom = rightBottom

    this.bottomLeft = bottomLeft
    this.bottomRight = bottomRight

    this.leftTop = leftTop
    this.leftBottom = leftBottom
  }
}

const createGraph = (array) => {
  for (let idx = 0; idx < len; idx += 1) {
    for (let jdx = 0; jdx < len; jdx += 1) {
      const node = new Node(
        [idx + 2, jdx - 1],
        [idx + 2, jdx + 1],
        [idx + 1, jdx + 2],
        [idx - 1, jdx + 2],
        [idx - 2, jdx - 1],
        [idx - 2, jdx + 1],
        [idx + 1, jdx - 2],
        [idx - 1, jdx - 2],
      )
      array[idx].push(node)
    }
  }
}

createGraph(chessboardGraph)

const compareAddresses = (node1, node2) => {
  const [a, b] = node1
  const [c, d] = node2
  return (a === c && b === d)
}

const returnChildNodes = (node) => {
  const childNodes = []
  try {
    childNodes.push(chessboardGraph[node.topLeft[0]][node.topLeft[1]])
  } catch (e) {
    childNodes.push(undefined)
  }

  try {
    childNodes.push(chessboardGraph[node.topRight[0]][node.topRight[1]])
  } catch (e) {
    childNodes.push(undefined)
  }

  try {
    childNodes.push(chessboardGraph[node.rightTop[0]][node.rightTop[1]])
  } catch (e) {
    childNodes.push(undefined)
  }

  try {
    childNodes.push(chessboardGraph[node.rightBottom[0]][node.rightBottom[1]])
  } catch (e) {
    childNodes.push(undefined)
  }

  try {
    childNodes.push(chessboardGraph[node.bottomLeft[0]][node.bottomLeft[1]])
  } catch (e) {
    childNodes.push(undefined)
  }

  try {
    childNodes.push(chessboardGraph[node.bottomRight[0]][node.bottomRight[1]])
  } catch (e) {
    childNodes.push(undefined)
  }

  try {
    childNodes.push(chessboardGraph[node.leftTop[0]][node.leftTop[1]])
  } catch (e) {
    childNodes.push(undefined)
  }

  try {
    childNodes.push(chessboardGraph[node.leftBottom[0]][node.leftBottom[1]])
  } catch (e) {
    childNodes.push(undefined)
  }

  return childNodes.filter((el) => el !== undefined)
}

const knightMoves = (start, end) => {
  const [a, b] = start
  const [c, d] = end
  let count = 0
  if (a === c && b === d) return [a, b]
  const searchQueue = [chessboardGraph[a][b], null]
  const searched = []
  while (searchQueue.length > 0) {
    const currentNode = searchQueue.shift()
    if (currentNode === null) {
      count += 1
    }
    if (currentNode !== null) {
      const subarr = chessboardGraph.find((arr) => arr.includes(currentNode))
      const index = [chessboardGraph.indexOf(subarr), subarr.indexOf(currentNode)]
      if (searched.indexOf(`${index}`) === -1) {
        if (compareAddresses(index, [c, d])) {
          return `You have made it in ${count} move${count > 1 ? 's' : ''}!`
        }
        searched.push(`${index}`)
        searchQueue.push(...returnChildNodes(currentNode))
      }
    } else if (searchQueue.length > 0) searchQueue.push(null)
  }
  return count
}

console.log(knightMoves([3, 3], [0, 0]))
