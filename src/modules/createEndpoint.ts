import { Endpoint } from '../endpoint'
import { Logger } from '../logger'
import { ICreateEndpointParams } from '../types/createEndpointParams'

export const createEndpoint = (params: ICreateEndpointParams) => {
  const { name, execute, normalizeData = (data: any) => data, headers = {}, withOwnResponse = false } = params
  class NewEndpoint extends Endpoint {
      constructor(logger: Logger) {
          super(logger, name)
          this.addExtraHeaders(headers)
          this.withOwnResponse = withOwnResponse
      }

      public execute(request: any, response: any) {
          return execute(request, response)
      }

      public normalizeData(data: any) {
          return normalizeData(data)
      }
  }
  return NewEndpoint
}