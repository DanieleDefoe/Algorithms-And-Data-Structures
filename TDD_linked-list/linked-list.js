/* eslint-disable consistent-return */
/* eslint-disable max-classes-per-file */

class LinkedListNode {
  constructor(value, next) {
    this.value = value
    this.next = next
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }

  static fromValues(...values) {
    const ll = new LinkedList()
    for (let i = values.length - 1; i >= 0; i -= 1) {
      ll.insertAtHead(values[i])
    }
    return ll
  }

  insertAtHead(data) {
    const newNode = new LinkedListNode(data, this.head)
    this.head = newNode
    this.length += 1
  }

  getByIndex(index) {
    if (index < 0 || index >= this.length) return null
    let currentElement = this.head
    let currentIndex = 0
    while (currentIndex !== index) {
      currentElement = currentElement.next
      currentIndex += 1
    }
    return currentElement
  }

  print() {
    let currentElement = this.head
    let result = ''
    while (currentElement !== null) {
      result = `${result}${currentElement.value} --> `
      currentElement = currentElement.next
    }
    console.log(`${result}null`)
  }

  insertAtIndex(index, value) {
    if (index === 0) return this.insertAtHead(value)
    const prev = this.getByIndex(index - 1)
    if (prev === null) return
    prev.next = new LinkedListNode(value, prev.next)
    this.length += 1
  }

  removeHead() {
    this.head = this.head.next
    this.length -= 1
  }

  pop() {
    const prevlastElement = this.getByIndex(this.length - 2)
    const result = prevlastElement.next
    prevlastElement.next = null
    this.length -= 1
    return result
  }

  removeAtIndex(index) {
    if (index < 0 || index >= this.length) return
    if (index === 0) return this.removeHead()
    const prevNode = this.getByIndex(index - 1)
    const nextNode = this.getByIndex(index + 1)
    prevNode.next = nextNode
    this.length -= 1
  }
}

module.exports = LinkedList
