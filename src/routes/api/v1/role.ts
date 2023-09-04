import { useToken } from 'expresso-hooks'
import { type ExpiresType } from 'expresso-hooks/lib/token/interface'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { authMiddleware } from '~/app/middleware/auth'
import { notPermittedAccess, permissionAccess } from '~/app/middleware/permission'
import { env } from '~/config/env'
import HttpResponse from '~/core/modules/response/HttpResponse'

export default async function roleRoute(fastify: FastifyInstance) {
  fastify.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    const httpResponse = HttpResponse.get({ message: 'role route' })
    reply.status(200).send(httpResponse)
  })

  fastify.get(
    '/login',
    async function (request: FastifyRequest, reply: FastifyReply) {
      const payloadToken = { uid: 'dfbec9de-0e99-46cc-b54a-4ffeca84f85d' }

      const { token, expiresIn } = useToken.generate({
        value: payloadToken,
        secretKey: env.JWT_SECRET_ACCESS_TOKEN,
        expires: env.JWT_ACCESS_TOKEN_EXPIRED as ExpiresType,
      })

      const httpResponse = HttpResponse.created({ token, expiresIn })
      reply.status(200).send(httpResponse)
    }
  )

  fastify.get(
    '/protect',
    { preHandler: [authMiddleware, permissionAccess(['USER'])] },
    async function (request: FastifyRequest, reply: FastifyReply) {
      reply.status(200).send({ message: 'is auth user only' })
    }
  )

  fastify.get(
    '/permitted',
    { preHandler: [authMiddleware, notPermittedAccess(['USER'])] },
    async function (request: FastifyRequest, reply: FastifyReply) {
      reply.status(200).send({ message: 'is auth admin only' })
    }
  )
}
