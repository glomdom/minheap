# minheap

Simple and performant [minheap](https://en.wiktionary.org/wiki/minheap) implementation for Roblox.

## Usage

```ts
import MinHeap from "@rbxts/minheap";

const minheap = new MinHeap();
minheap.push("Hello!", 25); // push "Hello!" with a priority of 25

print(minheap.size()); // returns 1, as there is only 1 element inside the heap
print(minheap.pop()); // pops the element with the lowest priority
print(minheap.pop()); // returns nil, no elements left
```