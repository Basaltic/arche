import { SyncDescriptor } from './descriptors';
import type { BrandedService, ServiceIdentifier } from './instantiation';

export interface IServiceRegistry {
  regiser<T, Services extends BrandedService[]>(
    id: ServiceIdentifier<T>,
    ctorOrDescriptor: { new (...services: Services): T } | SyncDescriptor<any>,
    supportsDelayedInstantiation: boolean
  ): void;

  getDescriptors(): [ServiceIdentifier<any>, SyncDescriptor<any>][];
}

/**
 * 服务注册器，服务的表示和服务实现本身（描述符）注册进去，后续需要获取对应的描述符来创建服务实例
 */
export class ServiceRegistry implements IServiceRegistry {
  private _registry: [ServiceIdentifier<any>, SyncDescriptor<any>][] = [];

  regiser<T, Services extends BrandedService[]>(
    id: ServiceIdentifier<T>,
    ctorOrDescriptor: SyncDescriptor<any> | (new (...services: Services) => T),
    supportsDelayedInstantiation?: boolean
  ) {
    if (!(ctorOrDescriptor instanceof SyncDescriptor)) {
      ctorOrDescriptor = new SyncDescriptor<T>(ctorOrDescriptor as new (...args: any[]) => T, [], supportsDelayedInstantiation);
    }

    this._registry.push([id, ctorOrDescriptor]);
  }

  getDescriptors() {
    return this._registry;
  }
}
