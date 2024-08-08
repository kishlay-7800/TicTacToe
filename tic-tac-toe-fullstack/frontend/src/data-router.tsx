import { ActionFunctionArgs, DataRouteObject, LoaderFunctionArgs, Outlet, createBrowserRouter, useRouteError } from 'react-router-dom';
import { lazy } from 'react';

/////////////// Routes from the new folder /////////////////////////
const routesDir = './routes';
const routes = import.meta.glob([
  './routes/**/*.{jsx,tsx}', 
  '!./routes/**/__*/**', 
  '!./routes/**/*.test.{jsx,tsx}'
]);
const reactRouterRoutes = [] as DataRouteObject[];
const routeSegmentArrs = [] as string[][];
const routeIdsDict: Record<string, string> = {};

for (const routeId of Object.keys(routes)) {
  const routeSegmentArr = routeId
    .slice(routesDir.length)
    .split('/')
    .slice(1)
    .join('.')
    .split('.')
    .slice(0, -1);
  routeIdsDict[routeSegmentArr.join('.')] = routeId;
  routeSegmentArrs.push(routeSegmentArr);
}
routeSegmentArrs.sort((a, b) => a.length > b.length ? 1 : -1);
console.log(routeIdsDict);

for (const routeSegmentArr of routeSegmentArrs) {
  addRouteToReactRouter(routeSegmentArr, reactRouterRoutes);
}

function addRouteToReactRouter(routeSegmentArr: string[], reactRouterRoutes: DataRouteObject[]) {
  const nextAncestor = reactRouterRoutes.find(route => route.id === routeSegmentArr.slice(0, route.id.split('.').length).join('.'));
  const routeId = routeSegmentArr.join('.');
  if (nextAncestor) {
    addRouteToReactRouter(routeSegmentArr, nextAncestor.children as DataRouteObject[]);
  } else {
    reactRouterRoutes.push({
      id: routeId,
      path: generatePath(routeSegmentArr),
      Component: lazy(routes[routeIdsDict[routeId]] as any),
      loader: async (args: LoaderFunctionArgs) => {
        const loaderFn = (await routes[routeIdsDict[routeId]]() as any).loader;
        if (!loaderFn) return null;
        return await loaderFn(args);
      },
      action: async (args: ActionFunctionArgs) => {
        const actionFn = (await routes[routeIdsDict[routeId]]() as any).action;
        if (!actionFn) return null;
        return await actionFn(args);
      },
      ErrorBoundary: lazy(() => (
        routes[routeIdsDict[routeId]]()).then((m: any) => ({ 
          default: m.ErrorBoundary || (() => {
            const error = useRouteError();
            throw error;
          })
        }))
      ),
      children: []
    });
  }
}

function generatePath(routeSegmentArr: string[]) {
  return '/' + routeSegmentArr
    .filter(segment => segment !== 'index' && segment !== '_index' && segment[0] !== '_')
    .map(segment => segment === '$' ? '*' : segment)
    .map(segment => segment.replaceAll('_', '').replaceAll('+', '').replaceAll('$', ':'))
    .join('/');
}

export const router = createBrowserRouter([{
  id: 'root',
  path: '/',
  Component: () => <Outlet />,
  shouldRevalidate: () => false,
  children: reactRouterRoutes,
}], {
  basename: import.meta.env.BASE_URL,
});