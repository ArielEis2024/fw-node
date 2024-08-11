import { IFrameworkConfig } from '../types/frameworkConfig'
import { IRoute } from '../types/route'
import Framework from '../framework'

export const createFramework = (config: IFrameworkConfig, routes: IRoute[]) => { 
  const fw = Framework(config)
  fw.setRoutes(routes)
  fw.listen()
}