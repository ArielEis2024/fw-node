import express from 'express'
import cors from 'cors'
import { Logger } from './logger'
import { Controller } from './controller'
import { Endpoint } from './endpoint'
import { setAllRoutes } from './routes'
import { IFrameworkConfig } from './types/frameworkConfig'
import { LOG_LEVELS } from './constants/logLevel'
import { IRoute } from './types/route'
const bodyParser = require('body-parser')

export class FrameWork {
    private config: IFrameworkConfig
    private engine: express.Express
    private logger: Logger

    constructor(config: IFrameworkConfig) {
        this.config = {
            port: config.port,
            jsonLimitSize: config.jsonLimitSize || '10mb',
            name: config.name || 'fw-node server',
            logLevel: config.logLevel || LOG_LEVELS[1]
        }

        this.engine = express()

        // Setup Engine
        this.engine.use(cors())
        this.engine.use(express.json({limit: this.config.jsonLimitSize}))
        this.logger = Logger.getInstance(this.config.logLevel)
    }

    public setRoutes(routes: IRoute[]) {
        setAllRoutes(this, routes)
    }

    public get(path: string, endpoint: typeof Endpoint) {
        this.engine.get(path, new Controller(endpoint, this.logger).mount())
    }

    public put(path: string, endpoint: typeof Endpoint, setMiddleware = () => null) {
        const middleware = setMiddleware()
        const uploadBinary = middleware ? middleware : bodyParser()
        this.engine.put(path, uploadBinary, new Controller(endpoint, this.logger).mount())
    }

    public post(path: string, endpoint: typeof Endpoint, setMiddleware = () => null) {
        const middleware = setMiddleware()
        const uploadBinary = middleware ? middleware : bodyParser()
        this.engine.post(path, uploadBinary, new Controller(endpoint, this.logger).mount())
    }

    public delete(path: string, endpoint: typeof Endpoint) {
        this.engine.delete(path, new Controller(endpoint, this.logger).mount())
    }

    public use(path: string, endpoint: typeof Endpoint) {
        this.engine.use(path, new Controller(endpoint, this.logger).mount())
    }

    public head(path: string, endpoint: typeof Endpoint) {
        this.engine.head(path, new Controller(endpoint, this.logger).mount())
    }

    public listen() {
        this.engine.listen(parseInt(`${this.config.port}`))
        this.logger.info('\x1b[32m' + this.config.name, `listening on port: ${this.config.port}\x1b[0m\n`, '', true)
    }
}

export default (config: IFrameworkConfig) => new FrameWork(config)