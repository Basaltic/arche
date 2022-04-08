import knex from 'knex';
import * as Y from 'yjs';

export async function createTableAndInsert() {
  const knexInstance = knex({
    client: 'sqlite',
    connection: './test.sqlite',
  });

  await knexInstance.schema.createTableIfNotExists('test', (table) => {
    table.increments('id');
    table.binary('content');
  });

  const doc = new Y.Doc();
  doc.getMap().set('a', 'abc');

  const stateUpdate = Y.encodeStateAsUpdateV2(doc);

  await knexInstance.table('test').insert({ content: stateUpdate });
}

export async function getContent() {
  const knexInstance = knex({
    client: 'sqlite',
    connection: './test.sqlite',
    useNullAsDefault: true,
  });

  const result: any = await knexInstance.select().from('test').first();

  const doc = new Y.Doc();
  Y.applyUpdateV2(doc, result.content);

  const map = doc.getMap();

  console.log('result', result);
  console.log(map.toJSON());

  // Y.encodeStateVector()
  // Y.encodeStateVectorFromUpdateV2()
}
