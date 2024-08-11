import { Logger } from './logger'

export interface IEndpointMethods {
    errorLog: (data: string, prefix?: any, suffix?: string) => void
    warnLog: (data: string, prefix?: any, suffix?: string) => void
    infoLog: (data: string, prefix?: any, suffix?: string) => void
    debugLog: (data: string, prefix?: any, suffix?: string) => void
    getIdentifier: () => string
    execute: (request: any, response: any) => Promise<any>
    hasOwnResponse(): boolean
    getResponseDelay(): number
    getResponseStatusCode(): number
}

export interface IEndpointHeaders {
    [key: string]: string
}

export class Endpoint implements IEndpointMethods {
    protected logger: Logger
    protected name: string
    protected withOwnResponse: boolean
    protected responseDelayInSeconds: number
    protected responseStatusCode: number
    protected extraHeaders: IEndpointHeaders

    constructor(logger: Logger, name: string) {
        this.logger = logger
        this.name = name
        this.withOwnResponse = false
        this.responseDelayInSeconds = 0
        this.responseStatusCode = 200
        this.extraHeaders = {
            'Content-Type': 'application/json',
            'x-powered-by': this.getIdentifier(),
        }
    }

    public errorLog(data: string, prefix = '', suffix = '') :void {
        this.logger.error(this.name, `${prefix} ${data} ${suffix}`)
    }

    public warnLog(data: string, prefix = '', suffix = '') :void {
        this.logger.warning(this.name, `${prefix} ${data} ${suffix}`)
    }

    public infoLog(data: string, prefix = '', suffix = '') :void {
        this.logger.info(this.name, `${prefix} ${data} ${suffix}`)
    }

    public debugLog(data: string, prefix = '', suffix = '') :void {
        this.logger.debug(this.name, `${prefix} ${data} ${suffix}`)
    }

    public getIdentifier(): string {
        return this.name
    }

    public hasOwnResponse(): boolean {
        return this.withOwnResponse
    }

    public getResponseDelay(): number {
        return this.responseDelayInSeconds
    }

    public getResponseStatusCode(): number {
        return this.responseStatusCode
    }

    public addExtraHeaders(extraHeaders: IEndpointHeaders): void {
        this.extraHeaders = Object.assign(this.extraHeaders, extraHeaders)
    }

    public getExtraHeaders(): IEndpointHeaders {
        return this.extraHeaders
    }

    public execute(request: any, response: any): Promise<any> {
        return new Promise(reject => reject(`Endpoint ${this.name} execute not implemented`))
    }

    public normalizeData(data: any): any {
        return data
    }
}
