export default class MinHeap {
  private items: { key: string; priority: number }[] = [];
  private positions: { [key: string]: number } = {};

  public push(key: string, priority: number): void {
    if (this.positions[key] !== undefined) {
      const index = this.positions[key];

      if (priority < this.items[index].priority) {
        this.items[index].priority = priority;
        this.siftUp(index);
      }
    } else {
      this.items.push({ key: key, priority: priority });

      const index = this.items.size();
      this.positions[key] = index;
      this.siftUp(index);
    }
  }

  public pop(): string | undefined {
    if (this.items.size() === 0) {
      return undefined;
    }

    const root = this.items[0];

    delete this.positions[root.key];
    this.items[0] = this.items[this.items.size() - 1];

    if (this.items[0] !== undefined) {
      this.positions[this.items[0].key] = 1;
    }

    this.items.pop();
    this.siftDown(1);

    return root.key;
  }

  public size(): number {
    return this.items.size();
  }

  private siftUp(index: number): void {
    if (index === 1) return;

    const parent = math.floor(index / 2);
    if (this.items[index].priority < this.items[parent].priority) {
      [this.items[index], this.items[parent]] = [this.items[parent], this.items[index]];
      this.positions[this.items[index].key] = index;
      this.positions[this.items[parent].key] = parent;

      this.siftUp(parent);
    }
  }

  private siftDown(index: number): void {
    const left = 2 * index;
    const right = 2 * index + 1;
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
