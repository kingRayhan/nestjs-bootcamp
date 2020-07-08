import { randomBytes } from 'crypto';

export function slugify(text: string, isUnique = false) {
  const random = randomBytes(4).toString('hex');
  const slug = text.split(' ').join('-');
  return isUnique ? `${slug}-${random}` : slug;
}
