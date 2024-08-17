import { FrameWork } from './framework';
import { IRoute } from './types/route';

export const setAllRoutes = (fw: FrameWork, routes: IRoute[]) => {
  routes.forEach(route => {
    switch (route.method) {
      case 'GET':
        fw.get(route.path, route.endpoint)
        break
      case 'PUT':
        fw.put(route.path, route.endpoint, route.setMiddleware)
        break
      case 'POST':
        fw.post(route.path, route.endpoint, route.setMiddleware)
        break
      case 'DELETE':
        fw.delete(route.path, route.endpoint)
        break
      case 'USE':
        fw.use(route.path, route.endpoint)
        break
      case 'HEAD':
        fw.head(route.path, route.endpoint)
        break
      default:
        throw new Error(`Method ${route.method} not supported`)
    }
  })
}