import type { BinaryLike } from 'crypto';
import { createHash } from 'crypto';

export function sha256sum(data: BinaryLike) {
  console.log('sha256');
  return createHash('sha256').update(data).digest('hex');
}
