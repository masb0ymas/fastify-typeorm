import { green } from 'colorette'
import { useToken } from 'expresso-hooks'
import { FastifyReply, FastifyRequest } from 'fastify'
import _ from 'lodash'
import { env } from '~/config/env'

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getToken = useToken.extract(request)

  // verify token
  const token = useToken.verify({
    token: String(getToken),
    secretKey: env.JWT_SECRET_ACCESS_TOKEN,
  })

  if (_.isEmpty(token?.data)) {
    const msgType = green('permission')
    reply.log.error(`${msgType} - unauthorized invalid jwt`)

    return reply.status(401).unauthorized('unauthorized, invalid jwt')
  }
}
