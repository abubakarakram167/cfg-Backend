/* eslint class-methods-use-this:0 */
const bunyan = require('bunyan');
const apiLogTag = require('../config/config').serviceLogTag;

class Logger extends bunyan {
    constructor(serviceLogTag) {
        super({ name: serviceLogTag });
    }

    logWarning(error, rawContext) {
        const level = 'warn';
        const context = this.prepareContext(rawContext);
        const log = {
            err: error,
            stack: error.stack,
            levelKeyWord: level,
            context,

        };
        this.warn(log, error.message);
    }

    logInfo(error, rawContext) {
        const level = 'info';
        const context = this.prepareContext(rawContext);
        const log = {
            err: error,
            stack: error.stack,
            levelKeyWord: level,
            context,

        };
        this.info(log, error.message);
    }

    logError(error, rawContext) {
        const level = 'error';
        const context = this.prepareContext(rawContext);
        const log = {
            err: error,
            stack: error.stack,
            levelKeyWord: level,
            context,

        };
        this.error(log, error.message);
    }

    logFatal(error, rawContext) {
        const level = 'error';
        const context = this.prepareContext(rawContext);
        const log = {
            err: error,
            stack: error.stack,
            levelKeyWord: level,
            context,
        };
        this.fatal(log, error.message);
    }

    initializeGlobalHandlers() {
        process.on('uncaughtException', (error) => {
            const log = {
                err: error,
                stack: error.stack,
                levelKeyWord: 'fatal',
                req: null,
            };
            this.fatal(log, error.message);
        });

        process.on('unhandledRejection', (error) => {
            const log = {
                err: error,
                stack: error.stack,
                levelKeyWord: 'fatal',
                req: null,
            };
            this.fatal(log, error.message);
        });
    }

    prepareContext(rawContext) {
        // JS doesnt log out complete error object. If error, attach stack to context
        if (rawContext) {
            const contextHasAnError = (rawContext.error && rawContext.error instanceof Error);
            const { error, ...rawContextTemp } = rawContext;
            if (contextHasAnError) {
                rawContextTemp.errorStack = rawContext.error.stack;
            }
            return rawContextTemp;
        }
        return null;
    }
}
const logger = new Logger(apiLogTag);

module.exports = logger;
