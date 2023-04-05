/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-multiple-empty-lines */
// all elements less than middle node
// are on the left side

// all elements greater than middle node
// are on the right side



// THE IDEA is to find the middle element of the array
// and make it the root of the tree

// THEN PERFORM THE SAME operation on the left subarray
// for the root's left child

// AND THE SAME operation on the right subarray
// for the root's right child



// Set the middle element of the array as root

// Recursively do the same for the left half and right half

// get the middle of the left half and make it the left child
// of the root created in step 1

// get the middle of the right half and make it the right child
// of the root created in step 1

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// class Node {
//   constructor(d) {
//     this.data = d
//     this.left = null
//     this.right = null
//   }
// }

// let root = null

// function sortedArraytoBST(array, start, end) {
//   if (start > end) return null
//   const mid = parseInt((start + end) / 2, 10)
//   const node = new Node(array[mid])

//   node.left = sortedArraytoBST(array, start, mid - 1)
//   node.right = sortedArraytoBST(array, mid + 1, end)
//   return node
// }

// time complexity O (N)
// auxiliary space O (H == height of the tree)
// ---->>>>  O ( LOG (N) )

// function preOrder(node) {
//   if (node === null) return

//   console.log(node.data)
//   preOrder(node.left)
//   preOrder(node.right)
// }

// root = sortedArraytoBST(arr, 0, arr.length - 1)
// preOrder(root)


//        5
//   2         8
//  1  3     6   9
//      4     7   10


// BST IS BALANCED if height of the left subtree
// and right subtree of root differ by at most 1 !!!

// left subtree is balanced (the same way)
// right subtree is balanced

class Node {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

const removeDuplicates = (array) => {
  const elements = {}
  const result = []
  for (let i = 0; i < array.length; i += 1) {
    if (!elements[array[i]]) {
      elements[array[i]] = 1
      result.push(array[i])
    }
  }
  return result
}

const quickSort = (array) => {
  if (array.length < 2) return array
  const pivotElement = array[0]
  const left = []
  const right = []
  for (let i = 1; i < array.length; i += 1) {
    if (array[i] < pivotElement) {
      left.push(array[i])
    } else {
      right.push(array[i])
    }
  }
  return [...quickSort(left), pivotElement, ...quickSort(right)]
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

const sortedArrayToBalancedBST = (array, start, end) => {
  if (start > end) return null

  const mid = parseInt((start + end) / 2, 10)
  const node = new Node(array[mid])

  node.left = sortedArrayToBalancedBST(array, start, mid - 1)
  node.right = sortedArrayToBalancedBST(array, mid + 1, end)

  return node
}

const buildTree = (array) => {
  const uniqueArray = removeDuplicates(array)
  const sortedUniqueArray = quickSort(uniqueArray)
  const len = sortedUniqueArray.length - 1
  const tree = sortedArrayToBalancedBST(sortedUniqueArray, 0, len)
  prettyPrint(tree)
  return tree
}

const arr = [4, 4, 2, 2, 7, 7, 1, 1, 3, 3, 7, 7, 9, 9, 5, 5, 6, 6, 8, 8]

class BinarySeachTree {
  constructor(array = []) {
    this.root = buildTree(array)
  }

  insert(data) {
    const newNode = new Node(data)
    if (this.root === null) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
    arr.push(data)
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else if (node.right === null) {
      node.right = newNode
    } else {
      this.insertNode(node.right, newNode)
    }
  }

  remove(data) {
    this.root = this.removeNode(this.root, data)
  }

  removeNode(node, data) {
    if (node === null) return null
    if (data < node.data) {
      node.left = this.removeNode(node.left, data)
      return node
    }
    if (data > node.data) {
      node.right = this.removeNode(node.right, data)
      return node
    }
    if (node.left === null && node.right === null) {
      node = null
      return node
    }
    if (node.left === null) {
      node = node.right
      return node
    }
    if (node.right === null) {
      node = node.left
      return node
    }
    const aux = this.findMinNode(node.right)
    node.data = aux.data

    node.right = this.removeNode(node.right, aux.data)
    return node
  }

  findMinNode(node = this.root) {
    if (node.left === null) return node
    return this.findMinNode(node.left)
  }

  find(data, node = this.root) {
    if (node === null) return null
    if (data < node.data) return this.find(data, node.left)
    if (data > node.data) return this.find(data, node.right)
    return node
  }

  levelOrder(callback = null, queue = [this.root], res = []) {
    if (queue[0] === null) {
      if (callback === null) return res
      return
    }
    const current = queue.shift()
    if (callback === null) {
      res.push(current.data)
    } else {
      callback(current.data)
    }
    queue.push(current.left, current.right)
    return this.levelOrder(callback, queue, res)
  }

  inOrderTraverse(callback, node = this.root) {
    if (node !== null) {
      this.inOrderTraverse(callback, node.left)
      callback(node.data)
      this.inOrderTraverse(callback, node.right)
    }
  }

  preOrderTraverse(callback, node = this.root) {
    if (node !== null) {
      callback(node.data)
      this.preOrderTraverse(callback, node.left)
      this.preOrderTraverse(callback, node.right)
    }
  }

  postOrderTraverse(callback, node = this.root) {
    if (node !== null) {
      this.postOrderTraverse(callback, node.left)
      this.postOrderTraverse(callback, node.right)
      callback(node.data)
    }
  }

  height(node = this.root) {
    if (node.right === null && node.left === null) return 1
    let heightLeft = 0
    let heightRight = 0
    if (node.left !== null) {
      heightLeft = this.height(node.left)
    }
    if (node.right !== null) {
      heightRight = this.height(node.right)
    }
    if (heightLeft > heightRight) {
      return heightLeft + 1
    }
    return heightRight + 1
  }

  depth(node = this.root.data) {
    let res = 0
    const queue = [this.root, null]
    while (queue.length > 0) {
      const temp = queue.shift()
      if (temp === null) {
        res += 1
      } else if (temp.data === node) {
        return res + 1
      }

      if (temp !== null) {
        if (temp.left) queue.push(temp.left)
        if (temp.right) queue.push(temp.right)
      } else if (queue.length > 0) queue.push(null)
    }
  }

  isBalanced(node = this.root) {
    if (node === null) return 0

    const leftHeight = this.isBalanced(node.left)
    if (leftHeight === false) return -1

    const rightHeight = this.isBalanced(node.right)
    if (rightHeight === false) return -1

    if (Math.abs(leftHeight - rightHeight) > 1) return -1
    return Math.max(leftHeight, rightHeight) + 1
  }

  rebalance() {
    this.root = buildTree(arr)
    return 'Balancing completed'
  }
}

const newTree = new BinarySeachTree(arr)

console.log(newTree.isBalanced())
console.log('\n')

newTree.levelOrder(console.log)
console.log('\n')

newTree.preOrderTraverse(console.log)
console.log('\n')

newTree.inOrderTraverse(console.log)
console.log('\n')

newTree.postOrderTraverse(console.log)
console.log('\n')

console.log(buildTree(arr))

console.log(newTree.height())
console.log(newTree.depth(9))

console.log(newTree.find(9))

console.log(newTree.findMinNode())



newTree.insert(123)
newTree.insert(124)
newTree.insert(125)
newTree.insert(126)
newTree.insert(126)
newTree.insert(126)
newTree.insert(126)
newTree.insert(126)
newTree.insert(127)
newTree.insert(128)
newTree.insert(129)
newTree.insert(130)
newTree.insert(131)
newTree.insert(132)

console.log(newTree.isBalanced())
console.log(newTree.rebalance())
