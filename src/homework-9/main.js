class Stack {
  constructor() {
    this.stack = [];
  }

  push(item) {
    this.stack.push(item);
  }
  pop() {
    this.stack.pop();
  }
  top() {
    const size = this.stack.length;
    if (size === 0) return null;
    return this.stack[size - 1];
  }
}

class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(item) {
    this.queue.push(item);
  }
  dequeue() {
    return this.queue.shift();
  }

  peek() {
    return this.queue[0];
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(item) {
    const newNode = new TreeNode(item);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    const queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      if (currentNode.left === null) {
        currentNode.left = newNode;
        return;
      } else {
        queue.push(currentNode.left);
      }
      if (currentNode.right === null) {
        currentNode.right = newNode;
        return;
      } else {
        queue.push(currentNode.right);
      }
    }
  }
  inorder(node = this.root, result = []) {
    if (node) {
      this.inorder(node.left, result);
      result.push(node.value);
      this.inorder(node.right, result);
    }
    return result;
  }

  preorder(node = this.root, result = []) {
    if (node) {
      result.push(node.value);
      this.preorder(node.left, result);
      this.preorder(node.right, result);
    }
    return result;
  }

  postorder(node = this.root, result = []) {
    if (node) {
      this.postorder(node.left, result);
      this.postorder(node.right, result);
      result.push(node.value);
    }
    return result;
  }
}

class TreeNode {
  constructor(item) {
    this.data = item;
    this.left = null;
    this.right = null;
  }
}

class Vertex {
  constructor(value) {
    this.value = value;
    this.neighbors = new Set();
  }
}

class Graph {
  constructor() {
    this.vertices = new Map();
  }

  addVertex(value) {
    if (!this.vertices.has(value)) {
      this.vertices.set(value, new Vertex(value));
    }
  }

  addEdge(fromValue, toValue) {
    const from = this.vertices.get(fromValue);
    const to = this.vertices.get(toValue);
    if (!from || !to) {
      throw new Error(`Both vertices must exist before adding an edge`);
    }
    from.neighbors.add(toValue);
  }
  bfs(startValue) {
    if (!this.vertices.has(startValue)) return [];
    const visited = new Set([startValue]);
    const queue = [startValue];
    const result = [];

    while (queue.length > 0) {
      const value = queue.shift();
      result.push(value);

      for (let neighbor of this.vertices.get(value).neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }

  dfs(startValue) {
    const visited = new Set();
    const order = [];

    const traverseDepthFirst = (vertex) => {
      visited.add(vertex);
      order.push(vertex);
      for (let neighbor of this.vertices.get(vertex).neighbors) {
        if (!visited.has(neighbor)) {
          traverseDepthFirst(neighbor);
        }
      }
    };

    if (this.vertices.has(startValue)) {
      traverseDepthFirst(startValue);
    }
    return order;
  }
}

const g = new Graph();
["A", "B", "C", "D", "E"].forEach((v) => g.addVertex(v));

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");

// BFS from A:
console.log(g.bfs("E")); // e.g. [ 'A', 'B', 'C', 'D', 'E' ]

// DFS  from A:
console.log(g.dfs("B")); // e.g. [ 'A', 'B', 'D', 'C', 'E' ]
