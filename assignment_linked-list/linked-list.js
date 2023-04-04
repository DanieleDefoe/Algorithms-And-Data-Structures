/* eslint-disable max-classes-per-file */
/* eslint-disable no-multiple-empty-lines */
// a linked list is a linear collection of data elements
// called "nodes" that POINT to the next node by means of a pointer

// each node hold a single element of data and a link
// or pointer to the next node in the list

// a head node is the first node in the list
// a tail node is the last node in the list



// [ NODE (head) ] --> [ NODE ] --> [ NODE (tail) ] --> null


// single-linked-list goes in one direction
// there is a single track that we can traverse the list in
// we start at the HEAD node and traverse from the root until
// the last node (NULL)

// double-linked-list ==>> nodes have two references
// to the next node and to the previous node

// circular-linked-list doesn't end with a node
// pointing to a null value
// it has a node that acts as the tail of the list
// and the node after the "tail" is the beginning
// of the list

class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head
  }

  size() {
    let count = 0
    let node = this.head
    while (node) {
      count += 1
      node = node.next
    }
    return count
  }

  clear() {
    this.head = null
  }

  headNode() {
    return this.head
  }

  tail() {
    let lastNode = this.head
    while (lastNode.next) {
      lastNode = lastNode.next
    }
    return lastNode
  }

  append(value) {
    const node = new Node(value)

    if (!this.head) {
      this.head = node
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
  }

  prepend(value) {
    const node = new Node(value)
    node.next = this.head
    this.head = node
  }

  insertAt(value, position) {
    const node = new Node(value)
    let current = this.head
    let prev = null
    let index = 0
    while (index < position) {
      prev = current
      current = current.next
      index += 1
    }
    prev.next = node
    node.next = current
  }

  removeAt(position) {
    let current = this.head
    if (position === 0) {
      this.head = current.next
    } else {
      let prev = null
      let index = 0
      while (index < position) {
        prev = current
        current = current.next
        index += 1
      }
      prev.next = current.next
    }
  }

  at(index) {
    let current = this.head
    let position = 0

    while (position < index) {
      current = current.next
      position += 1
    }
    return current.data
  }

  pop() {
    let current = this.head
    let prev = null
    while (current.next) {
      prev = current
      current = current.next
    }
    prev.next = null
    const result = current.data
    return result
  }

  contains(value) {
    let current = this.head
    while (current) {
      if (current.data === value) return true
      current = current.next
    }
    return false
  }

  find(value) {
    let current = this.head
    let index = 0
    while (current.data !== value) {
      current = current.next
      index += 1
    }
    return index
  }

  toString() {
    let current = this.head
    let result = ''
    while (current) {
      result += `( ${current.data} ) -> `
      current = current.next
    }
    result += 'null'
    return result
  }
}

const list = new LinkedList()

list.append(5)
list.append(2)
list.append(7)
list.append(3)
list.append(9)
list.append(1)
list.append(4)
list.append(8)
list.append(6)

console.log(list.toString())
console.log(list.headNode())
console.log(list.toString())
