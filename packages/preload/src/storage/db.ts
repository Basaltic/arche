import { createDecorator } from '../../../shared/di/instantiation';
import type { Knex } from 'knex';
import createKnex from 'knex';

export const IAppDb = createDecorator<AppDb>('IAppDb');

export class AppDb {
  private instance!: Knex;

  get knex() {
    if (!this.instance) {
      this.instance = createKnex({
        client: 'sqlite',
        connection: './test.sqlite',
      });
    }

    return this.instance;
  }
}
