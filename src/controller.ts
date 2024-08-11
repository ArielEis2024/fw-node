import { CustomError } from './customError'
import { Endpoint } from './endpoint'
import { Logger } from './logger'

export class Controller {
    protected endpoint: Endpoint
    protected logger: Logger
    protected name: string

    constructor(endpoint: typeof Endpoint, logger: Logger) {
        this.endpoint = new endpoint(logger, endpoint.name)
        this.logger = logger
        this.name = this.constructor.name
    }

    public mount() {
        this.endpoint.debugLog(this.endpoint.getIdentifier(), 'Endpoint', 'mounting')
        return this.endpointWrapper.bind(this)
    }

    public endpointWrapper(request: any, response: any) {
        try {
            return setTimeout(() => this.endpointExecute(request, response), this.endpoint.getResponseDelay() * 1000)
        } catch (e) {
            this.sendError(e, response)
        }
    }

    private endpointExecute(request: any, response: any) {
        try {
            return this.endpoint.execute(request, response)
            .then(result => {
                result = this.endpoint.normalizeData(result)
                if (this.endpoint.hasOwnResponse()) {
                    return
                }
                response.set(this.endpoint.getExtraHeaders()).status(this.endpoint.getResponseStatusCode()).send(result)
            })
            .catch(e => {
                this.sendError(e, response)
            })
        } catch (e) {
            this.sendError(e, response)
        }
    }

    private sendError(e: any, response: any) {
        const status = 500
        const message = e.toString()
        const data = null

        console.log('\n\x1b[31m', e, '\x1b[0m\n')
        console.log('\n\x1b[31m', JSON.stringify(e.data, null, 2), '\x1b[0m\n')

        if (e instanceof CustomError) {
            const data = e.getData(this.endpoint.getIdentifier())
            this.endpoint.errorLog(`${e.message} ${JSON.stringify(data)}`)
            response.set('Content-Type', 'application/json').status(e.getStatus()).send(data)

            return
        }

        this.endpoint.errorLog(`${message} \n ${e.stack.replace(e.message, '')}`)
        response.set('Content-Type', 'application/json').status(status).send({
            message,
            data,
            status,
        })
    }
}