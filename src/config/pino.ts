import { FastifyReply, FastifyRequest } from 'fastify'

export const logger: any = {
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
