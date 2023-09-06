import compress from '@fastify/compress'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import formBody from '@fastify/formbody'
import helmet from '@fastify/helmet'
import formMultipart from '@fastify/multipart'
import rateLimit from '@fastify/rate-limit'
import fastifySensible from '@fastify/sensible'
import fastifyStatic from '@fastify/static'
import { blue, green } from 'colorette'
import fastify, { FastifyInstance } from 'fastify'
import _ from 'lodash'
import path from 'path'
import { AppDataSource } from '~/database/data-source'
import indexRoutes from '~/routes'
import { env } from './env'
import { fastifyLogger, logger } from './pino'

export class App {
  private _app: FastifyInstance

  constructor() {
    this._app = fastify({
      logger: fastifyLogger,
    })

    this._plugins()
    this._database()
    this._routes()
  }

  // Plugins
  private _plugins() {
    this._app.register(cors)
    this._app.register(helmet)
    this._app.register(compress)
    this._app.register(cookie, { secret: env.APP_KEY })
    this._app.register(formBody)
    this._app.register(formMultipart)
    this._app.register(fastifyStatic, {
      root: path.join(__dirname, '/../../public'),
    })
    this._app.register(rateLimit, { max: 100 })
    this._app.register(fastifySensible)
  }

  // Routes
  private _routes() {
    this._app.register(indexRoutes)
  }

  // Database
  private _database(): void {
    const msgType = green('typeorm')

    // connect to database
    AppDataSource.initialize()
      .then((connection) => {
        const dbName = blue(`${_.get(connection, 'options.database', '')}`)
        const dbConnect = blue(`${_.get(connection, 'options.type', '')}`)

        const message = `database ${dbName}, connection ${dbConnect} has been established successfully.`
        logger.info(`${msgType} - ${message}`)
      })
      .catch((err) => {
        const message = `unable to connect to the database: ${err}`
        logger.error(`${msgType} - err, ${message}`)
      })
  }

  // Create App
  public create() {
    return this._app
  }
}
