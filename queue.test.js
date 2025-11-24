const { createQueue, enqueue, dequeue, getSize, isEmpty } = require('./queue');

describe('Queue Service', () => {
  let queue;

  beforeEach(() => {
    queue = createQueue();
  });

  describe('createQueue', () => {
    test('should create an empty queue', () => {
      expect(queue.messages).toEqual([]);
      expect(queue.size).toBe(0);
    });
  });

  describe('enqueue', () => {
    test('should add a message to the queue', () => {
      enqueue(queue, 'test message');
      expect(queue.size).toBe(1);
      expect(queue.messages[0]).toBe('test message');
    });

    test('should add multiple messages', () => {
      enqueue(queue, 'msg1');
      enqueue(queue, 'msg2');
      enqueue(queue, 'msg3');
      expect(queue.size).toBe(3);
    });

    test('should throw error if queue is null', () => {
      expect(() => enqueue(null, 'message')).toThrow('Queue is required');
    });

    test('should throw error if message is null', () => {
      expect(() => enqueue(queue, null)).toThrow('Message cannot be null or undefined');
    });

    test('should throw error if message is undefined', () => {
      expect(() => enqueue(queue, undefined)).toThrow('Message cannot be null or undefined');
    });
  });

  describe('dequeue', () => {
    test('should remove and return the first message', () => {
      enqueue(queue, 'msg1');
      enqueue(queue, 'msg2');
      const msg = dequeue(queue);
      expect(msg).toBe('msg1');
      expect(queue.size).toBe(1);
    });

    test('should return null if queue is empty', () => {
      const msg = dequeue(queue);
      expect(msg).toBeNull();
    });

    test('should throw error if queue is null', () => {
      expect(() => dequeue(null)).toThrow('Queue is required');
    });

    test('should maintain FIFO order', () => {
      enqueue(queue, 'first');
      enqueue(queue, 'second');
      enqueue(queue, 'third');
      expect(dequeue(queue)).toBe('first');
      expect(dequeue(queue)).toBe('second');
      expect(dequeue(queue)).toBe('third');
    });
  });

  describe('getSize', () => {
    test('should return 0 for empty queue', () => {
      expect(getSize(queue)).toBe(0);
    });

    test('should return correct size after enqueue', () => {
      enqueue(queue, 'msg1');
      enqueue(queue, 'msg2');
      expect(getSize(queue)).toBe(2);
    });

    test('should throw error if queue is null', () => {
      expect(() => getSize(null)).toThrow('Queue is required');
    });
  });

  describe('isEmpty', () => {
    test('should return true for empty queue', () => {
      expect(isEmpty(queue)).toBe(true);
    });

    test('should return false after enqueue', () => {
      enqueue(queue, 'message');
      expect(isEmpty(queue)).toBe(false);
    });

    test('should return true after dequeue all', () => {
      enqueue(queue, 'msg');
      dequeue(queue);
      expect(isEmpty(queue)).toBe(true);
    });

    test('should throw error if queue is null', () => {
      expect(() => isEmpty(null)).toThrow('Queue is required');
    });
  });
});
