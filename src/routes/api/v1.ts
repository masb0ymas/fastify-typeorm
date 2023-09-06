import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import roleController from '~/app/controller/role.controller'

export default async function v1Route(fastify: FastifyInstance) {
  fastify.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    const endpoint = request.url
    const method = request.method

    const message = `Forbidden, wrong access method ${method} endpoint: ${endpoint}`
    return reply.forbidden(message)
  })

  fastify.register(roleController, { prefix: '/role' })
}
