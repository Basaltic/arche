import type { TElement } from './element.types';
import { boardElement } from './board';
import { mathElement } from './math';

/**
 * Register Element
 */
export class ElementRegistry {
  private registry = new Map<string, TElement>();

  register(element: TElement) {
    this.registry.set(element.type, element);
  }

  get(type: string) {
    return this.registry.get(type);
  }

  getAll() {
    return Array.from(this.registry.values());
  }
}

export const elementRegistry = new ElementRegistry();

elementRegistry.register(boardElement);
elementRegistry.register(mathElement);
