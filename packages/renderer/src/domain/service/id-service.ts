import { nanoid } from 'nanoid';
import { createDecorator } from '../../../../shared/di/instantiation';

export interface IIdService {
  // _serviceBrand: undefined;
  /**
   * Get User Id
   */
  getUserId(): string;

  getId(): string;
}

export const IIdService = createDecorator<IIdService>('IIdService');

export class IdService implements IIdService {
  getUserId() {
    const id = this.getId();
    return `u+${id}`;
  }

  getId() {
    return nanoid(30);
  }
}

export const idService = new IdService();
