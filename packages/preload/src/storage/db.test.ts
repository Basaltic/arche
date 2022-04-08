import { expect, test } from 'vitest';
import { createHash } from 'crypto';
import { createTableAndInsert, getContent } from './db-test';

test('sqlite db', async () => {
  await createTableAndInsert();

  await getContent();
});
