import type { TagGroup } from "../entities";

export interface Route {
  title: string;
  path: string;
  Icon: any;
  routeAdd?: Route;
}

export interface Filter {
  name: TagGroup;
  id: string;
}

export interface ChartSerie {
  name: string;
  data: number[];
}
