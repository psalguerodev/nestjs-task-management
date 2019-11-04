export class Lrucache<T> {

  private values: Map<string, T> = new Map<string, T>();
  private static readonly MAX_DEFAULT_ENTRIES: number = 20;

  constructor(private _capacity: number = Lrucache.MAX_DEFAULT_ENTRIES ) {}

  get capacity(): number {
    return this._capacity;
  }

  set capacity(capacity: number) {
    this._capacity = capacity;
  }

  get(key: string): T {
    const hasKey = this.values.has(key);
    let entry: T;

    if (hasKey) {
      entry = this.values.get(key);
      this.values.delete(key);
      this.values.set(key, entry);
    }

    return entry;
  }

  set(key: string, value: T): void {
    if (this.values.size >= this.capacity) {
      const keyDelete = this.values.keys().next().value;
      this.values.delete(keyDelete);
    }

    this.values.set(key, value);
  }


}
