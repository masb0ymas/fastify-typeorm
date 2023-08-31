import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import HttpResponse from '~/core/modules/response/HttpResponse'

export default async function roleRoute(fastify: FastifyInstance) {
  fastify.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    const httpResponse = HttpResponse.get({ message: 'role route' })
    reply.status(200).send(httpResponse)
  })
}
