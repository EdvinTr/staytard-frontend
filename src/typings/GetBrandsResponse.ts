export interface GetBrandsResponse {
  count: number;
  brands: { [key in SortedBrandKey]: Brand[] };
}

export interface Brand {
  id: number;
  name: string;
  path: string;
}

export type SortedBrandKey =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z"
  | "#";
