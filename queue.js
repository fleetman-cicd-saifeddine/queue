/**
 * Creates a new queue instance
 * @returns {Object} Queue object with messages array and size
 */
function createQueue() {
  return {
    messages: [],
    size: 0
  };
}

/**
 * Adds a message to the queue
 * @param {Object} queue - The queue object
 * @param {*} message - The message to add
 * @returns {Object} The updated queue
 */
function enqueue(queue, message) {
  if (!queue) {
    throw new Error('Queue is required');
  }
  if (message === null || message === undefined) {
    throw new Error('Message cannot be null or undefined');
  }
  queue.messages.push(message);
  queue.size += 1;
  return queue;
}

/**
 * Removes and returns the first message from the queue
 * @param {Object} queue - The queue object
 * @returns {*} The first message or null if queue is empty
 */
function dequeue(queue) {
  if (!queue) {
    throw new Error('Queue is required');
  }
  if (queue.size > 0) {
    queue.size -= 1;
    return queue.messages.shift();
  }
  return null;
}

/**
 * Returns the size of the queue
 * @param {Object} queue - The queue object
 * @returns {number} The size of the queue
 */
function getSize(queue) {
  if (!queue) {
    throw new Error('Queue is required');
  }
  return queue.size;
}

/**
 * Checks if the queue is empty
 * @param {Object} queue - The queue object
 * @returns {boolean} True if queue is empty
 */
function isEmpty(queue) {
  if (!queue) {
    throw new Error('Queue is required');
  }
  return queue.size === 0;
}

module.exports = {
  createQueue,
  enqueue,
  dequeue,
  getSize,
  isEmpty
};