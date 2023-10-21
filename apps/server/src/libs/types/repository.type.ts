type Repository<T = unknown> = {
  findById(id: number): Promise<T>;
  findAll(payload?: unknown): Promise<T[]>;
  create(payload: unknown): T;
  update(payload: unknown): Promise<T>;
  delete(payload: unknown): Promise<T>;
};

export { type Repository };
