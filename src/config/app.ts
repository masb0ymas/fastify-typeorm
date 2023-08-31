import compress from '@fastify/compress'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import formBody from '@fastify/formbody'
import helmet from '@fastify/helmet'
import formMultipart from '@fastify/multipart'
import rateLimit from '@fastify/rate-limit'
import fastifySensible from '@fastify/sensible'
import fastifyStatic from '@fastify/static'
import fastify, { FastifyInstance } from 'fastify'
import path from 'path'
import indexRoutes from '~/routes'
import { env } from './env'
import { logger } from './pino'

export class App {
  private _app: FastifyInstance

  constructor() {
    this._app = fastify({
      logger: logger,
    })

    this._plugins()
    this._routes()
  }

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

  private _routes() {
    this._app.register(indexRoutes)
  }

  public create() {
    return this._app
  }
}
