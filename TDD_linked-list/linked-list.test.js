/* eslint-disable no-undef */
const LinkedList = require('./linked-list')

// ("#") at the beginning is just a convention
// meaning that we are testing a method of a class
describe('#insertAtHead', () => {
  test('it should add the element to the beginning of the list', () => {
    const ll = new LinkedList()
    ll.insertAtHead(10)
    const oldHead = ll.head
    ll.insertAtHead(20)

    expect(ll.head.value).toBe(20)
    expect(ll.head.next).toBe(oldHead)
    expect(ll.length).toBe(2)
  })
})

describe('#getByIndex', () => {
  describe('with index less than zero', () => {
    test('it should return null', () => {
      const ll = LinkedList.fromValues(10, 20)
      expect(ll.getByIndex(-1)).toBeNull()
    })
  })

  describe('with index greater than the length of an array', () => {
    test('it should return null', () => {
      const ll = LinkedList.fromValues(10, 20)
      expect(ll.getByIndex(5)).toBeNull()
    })
  })

  describe('with index 0', () => {
    test('it should return the head', () => {
      const ll = LinkedList.fromValues(10, 20)
      expect(ll.getByIndex(0).value).toBe(10)
    })
  })

  describe('with index in the middle', () => {
    test('it should return the element at that index', () => {
      const ll = LinkedList.fromValues(10, 20, 30, 40)
      expect(ll.getByIndex(2).value).toBe(30)
    })
  })
})

describe('#insertAtIndex', () => {
  describe('with index less than 0', () => {
    test('it should not insert anything', () => {
      const ll = LinkedList.fromValues(10, 20)
      ll.insertAtIndex(-1, 30)
      expect(ll.length).toBe(2)
    })
  })

  describe('with index greater than length', () => {
    test('it should not insert anything', () => {
      const ll = LinkedList.fromValues(10, 20)
      ll.insertAtIndex(5, 30)
      expect(ll.length).toBe(2)
    })
  })

  describe('with index 0', () => {
    test('it should insert at the beginning', () => {
      const ll = LinkedList.fromValues(10, 20)
      const oldHead = ll.head
      ll.insertAtIndex(0, 30)
      expect(ll.length).toBe(3)
      expect(ll.head.value).toBe(30)
      expect(ll.head.next).toEqual(oldHead)
    })
  })

  describe('with index in the middle', () => {
    test('it should insert at the given index', () => {
      const ll = LinkedList.fromValues(10, 20, 30, 40)
      ll.insertAtIndex(2, 50)

      const node = ll.getByIndex(2)
      expect(ll.length).toBe(5)
      expect(node.value).toBe(50)
      expect(node.next.value).toBe(30)
    })
  })
})

describe('#removeHead', () => {
  test('it should remove the head', () => {
    const ll = LinkedList.fromValues(10, 20, 30)
    ll.removeHead()

    expect(ll.head.value).toBe(20)
    expect(ll.length).toBe(2)
    expect(ll.head.next.value).toBe(30)
  })
})

describe('#pop', () => {
  test('it should remove the last element and return it', () => {
    const ll = LinkedList.fromValues(10, 20, 30)
    const result = ll.pop()
    expect(result.value).toBe(30)
    expect(ll.length).toBe(2)
    expect(ll.getByIndex(2)).toBeNull()
  })
})

describe('#removeAtIndex', () => {
  describe('with index less than 0', () => {
    test('it should not remove anything', () => {
      const ll = LinkedList.fromValues(10, 20)
      ll.removeAtIndex(-1)
      expect(ll.length).toBe(2)
    })
  })

  describe('with index greater than length', () => {
    test('it should not remove anything', () => {
      const ll = LinkedList.fromValues(10, 20)
      ll.removeAtIndex(5)
      expect(ll.length).toBe(2)
    })
  })

  describe('with index 0', () => {
    test('it should remove at the beginning', () => {
      const ll = LinkedList.fromValues(10, 20, 30)
      ll.removeAtIndex(0)
      expect(ll.length).toBe(2)
      expect(ll.head.value).toBe(20)
      expect(ll.head.next.value).toBe(30)
    })
  })

  describe('with index in the middle', () => {
    test('it should remove at the given index', () => {
      const ll = LinkedList.fromValues(10, 20, 30, 40)
      ll.removeAtIndex(2)

      const node = ll.getByIndex(1)
      expect(ll.length).toBe(3)
      expect(node.next.value).toBe(40)
    })
  })
})
