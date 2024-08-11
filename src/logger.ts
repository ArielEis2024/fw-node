import { format } from 'date-fns'
import { LOG_LEVELS } from './constants/logLevel'
import { ILogInfo } from './types/logInfo'

const logWithFormat = (info: ILogInfo, logLevels: string[]) => {
    if (!logLevels.includes(info.level)) {
        return
    }
    console.log(`\x1b[${info.color}m<${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}><${info.level}>${info.endpointIdentifier ? '<' + info.endpointIdentifier + '>' : ''}<${info.service}> - ${info.message}\x1b[0m`)
}

interface ILoggerMethods {
    error : (service: string, message: string) => void;
    warning : (service: string, message: string) => void;
    info : (service: string, message: string) => void;
    debug : (service: string, message: string) => void;
}

class Logger implements ILoggerMethods {
    private static instance: Logger
    private static logLevels: string[]

    public static getInstance(logLevel: string = LOG_LEVELS[1]): Logger {
        if (!Logger.instance) {
            const logLevelIndex = LOG_LEVELS.findIndex(item => item.toLowerCase() === logLevel.toLowerCase())
            Logger.logLevels = LOG_LEVELS.slice(logLevelIndex)
            Logger.instance = new Logger()
        }

        return Logger.instance
    }

    public error(service: string, message: string, endpointIdentifier: string = ''): void {
        logWithFormat({
            service,
            endpointIdentifier,
            message,
            level: 'ERROR',
            color: 31,
        }, Logger.logLevels)
    }

    public warning(service: string, message: string, endpointIdentifier: string = ''): void {
        logWithFormat({
            service,
            endpointIdentifier,
            message,
            level: 'WARNING',
            color: 33,
        }, Logger.logLevels)
    }

    public info(service: string, message: string, endpointIdentifier: string = '', forceLog = false): void {
        logWithFormat({
            service,
            endpointIdentifier,
            message,
            level: 'INFO',
            color: 32,
        }, forceLog ? LOG_LEVELS : Logger.logLevels)
    }

    public debug(service: string, message: string, endpointIdentifier: string = ''): void {
        logWithFormat({
            service,
            endpointIdentifier,
            message,
            level: 'DEBUG',
            color: 37,
        }, Logger.logLevels)
    }
}

export { Logger, ILoggerMethods }