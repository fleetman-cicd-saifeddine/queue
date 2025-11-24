function createQueue() {
  return {
    messages: [],
    size: 0
  };
}

function enqueue(queue, message) {
  queue.messages.push(message);
  queue.size += 1;
  return queue;
}

function dequeue(queue) {
  if (queue.size > 0) {
    queue.size -= 1;
    return queue.messages.shift();
  }
  return null;
}

module.exports = {
  createQueue,
  enqueue,
  dequeue
};
