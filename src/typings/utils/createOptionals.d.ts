export type CreateOptionals<T> = {
  [Property in keyof T]+?: T[Property];
};
