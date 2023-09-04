import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { green } from 'colorette'

export function permissionAccess(roles: string[]) {
  return async function (
    request: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction
  ) {
    const errType = `permitted access error:`
    const errMessage = 'you are not allowed'

    if (!roles.includes('ADMIN')) {
      const msgType = green('permission')
      reply.log.error(`${msgType} - ${errType} ${errMessage}`)

      return reply.status(403).forbidden(`${errType} ${errMessage}`)
    }

    done()
  }
}

export function notPermittedAccess(roles: string[]) {
  return async function (
    request: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction
  ) {
    const errType = `not permitted access error:`
    const errMessage = 'you are not allowed'

    if (roles.includes('ADMIN')) {
      const msgType = green('permission')
      reply.log.error(`${msgType} - ${errType} ${errMessage}`)

      return reply.status(403).forbidden(`${errType} ${errMessage}`)
    }

    done()
  }
}
