//!native

/**
 * Stores key-priority pairs and allows efficient retrieval
 * and update of the element with the smallest priority.
 */
export default class MinHeap {
  private items: { key: string; priority: number }[] = [];
  private positions: { [key: string]: number } = {};

  /**
   * Inserts a key with the given priority into the heap.
   * If the key already exists and the new priority is smaller,
   * it updates the priority and repositions the element.
   *
   * @param key The unique identifier for the element.
   * @param priority The priority associated with the key.
   */
  public push(key: string, priority: number): void {
    if (this.positions[key] !== undefined) {
      const index = this.positions[key];

      if (priority < this.items[index].priority) {
        this.items[index].priority = priority;
        this.siftUp(index);
      }
    } else {
      this.items.push({ key: key, priority: priority });

      const index = this.items.size() - 1;
      this.positions[key] = index;
      this.siftUp(index);
    }
  }

  /**
   * Removes and returns the key with the smallest priority.
   * Returns `undefined` if the heap is empty.
   *
   * @returns The key with the minimum priority or `undefined`.
   */
  public pop(): string | undefined {
    if (this.items.size() === 0) {
      return undefined;
    }

    const root = this.items[0];

    delete this.positions[root.key];
    this.items[0] = this.items[this.items.size() - 1];

    if (this.items[0] !== undefined) {
      this.positions[this.items[0].key] = 0;
    }

    this.items.pop();
    this.siftDown(0);

    return root.key;
  }

  /**
   * Returns the number of elements in the heap.
   *
   * @returns The current size of the heap.
   */
  public size(): number {
    return this.items.size();
  }

  /**
   * Moves the element at the given index up the heap
   * until the heap property is restored.
   *
   * @param index The index to start sifting up from.
   */
  private siftUp(index: number): void {
    if (index === 0) return;

    const parent = math.floor((index - 1) / 2);
    if (this.items[index].priority < this.items[parent].priority) {
      [this.items[index], this.items[parent]] = [this.items[parent], this.items[index]];
      this.positions[this.items[index].key] = index;
      this.positions[this.items[parent].key] = parent;

      this.siftUp(parent);
    }
  }

  /**
   * Moves the element at the given index down the heap
   * until the heap property is restored.
   *
   * @param index The index to start sifting down from.
   */
  private siftDown(index: number): void {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallest = index;

    if (left < this.items.size() && this.items[left].priority < this.items[smallest].priority) {
      smallest = left;
    }

    if (right < this.items.size() && this.items[right].priority < this.items[smallest].priority) {
      smallest = right;
    }

    if (smallest !== index) {
      [this.items[index], this.items[smallest]] = [this.items[smallest], this.items[index]];
      this.positions[this.items[index].key] = index;
      this.positions[this.items[smallest].key] = smallest;

      this.siftDown(smallest);
    }
  }
}
