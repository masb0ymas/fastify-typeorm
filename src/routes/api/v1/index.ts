import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import roleRoute from './role'

export default async function v1Route(fastify: FastifyInstance) {
  fastify.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    const endpoint = request.url
    const method = request.method

    const message = `Forbidden, wrong access method ${method} endpoint: ${endpoint}`
    return reply.forbidden(message)
  })

  fastify.register(roleRoute, { prefix: '/role' })
}
