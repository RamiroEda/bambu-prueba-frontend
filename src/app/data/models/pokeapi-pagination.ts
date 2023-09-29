export interface PokeapiPagination<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}
