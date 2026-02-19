export interface Route {
  title: string;
  path: string;
  // biome-ignore lint/suspicious/noExplicitAny: lucide icon
  Icon: any;
  routeAdd?: Route;
  view: string;
}
