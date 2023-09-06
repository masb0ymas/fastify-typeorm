import { FastifyReply, FastifyRequest } from 'fastify'
import { pino } from 'pino'
import { formatDate } from '~/core/utils/date'
import { env } from './env'

export const logger = pino(
  {
    level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  },
  pino.destination(`./logs/pino-${formatDate(new Date())}.log`)
)

export const fastifyLogger: any = {
  transport: {
    target: 'pino-pretty',
  },
  serializers: {
    req(request: FastifyRequest) {
      return {
        id: request.id,
        method: request.method,
        url: request.url,
        query: request.query,
        path: request.routerPath,
        params: request.params,
        // Including the headers in the log could be in violation
        // of privacy laws, e.g. GDPR. You should use the "redact" option to
        // remove sensitive fields. It could also leak authentication data in
        // the logs.
        headers: request.headers,
      }
    },
    res(reply: FastifyReply) {
      // The default
      return {
        statusCode: reply.statusCode,
      }
    },
  },
}
