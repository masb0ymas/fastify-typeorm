import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { formatDateTime } from '~/core/utils/date'

export default async function indexRoutes(fastify: FastifyInstance) {
  fastify.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    const data = {
      message: 'Fastify TypeORM',
      maintaner: 'masb0ymas, <n.fajri@mail.com>',
      source: 'https://github.com/masb0ymas/fastify-typeorm',
    }

    const httpResponse = { code: 200, ...data }
    reply.status(200).send(httpResponse)
  })

  fastify.get('/health', (request: FastifyRequest, reply: FastifyReply) => {
    const startUsage = process.cpuUsage()

    const data = {
      uptime: process.uptime(),
      message: 'Ok',
      timezone: 'ID',
      date: formatDateTime(new Date()),
      fastify: fastify.version,
      node: process.version,
      memory: process.memoryUsage,
      platform: process.platform,
      cpu_usage: process.cpuUsage(startUsage),
    }

    const httpResponse = { code: 200, message: 'Server Uptime', data }
    reply.status(200).send(httpResponse)
  })

  fastify.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
    const endpoint = request.url
    const method = request.method

    const message = `Sorry, the ${endpoint} HTTP method ${method} resource you are looking for was not found.`
    reply.status(404).send({ code: 404, message })
  })
}
