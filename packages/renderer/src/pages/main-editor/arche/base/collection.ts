

/**
 * Collection
 */
export class Collection<T> {
  private entries = new Map<string, T>();

  get(id: string): T | undefined {
    return this.entries.get(id);
  }

  set(id: string, instance: T) {
    this.entries.set(id, instance);
  }

  remove(id: string): boolean {
    return this.entries.delete(id);
  }
}


