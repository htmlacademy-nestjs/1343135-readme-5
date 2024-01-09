export type Entity<T = unknown> = T & {
  id?: string;
  toPOJO?: () => Record<string, unknown>;
};
