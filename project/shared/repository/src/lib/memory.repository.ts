import { randomUUID } from 'node:crypto';
import { Entity } from './entity.type';
import { Repository } from './repository.interface';

export abstract class MemoryRepository<T extends Entity> implements Repository<T> {
  protected readonly memo = new Map<T['id'], T>();

  public async findById(id: T['id']) {
    return this.memo.get(id) || null;
  }

  public async save(entity: T) {
    if (!entity.id) {
      entity.id = randomUUID();
    }

    this.memo.set(entity.id, entity);
    return entity;
  }

  public async update(id: T['id'], entity: T) {
    const existing = this.memo.get(id);

    if (!existing) {
      throw new Error(`Entity with provided id "${id}" does not exist`);
    }

    this.memo.set(id, { ...existing, ...entity, id });
    return entity;
  }

  public async deleteById(id: T['id']) {
    this.memo.delete(id);
  }
}
