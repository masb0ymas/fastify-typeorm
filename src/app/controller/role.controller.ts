import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import _ from 'lodash'
import HttpResponse from '~/core/modules/response/HttpResponse'
import { routeLogger } from '~/core/utils/formatter'
import { RoleAttributes } from '~/database/entities/Role'
import { yupValidation } from '../middleware/yupValidation'
import roleSchema from '../schema/role.schema'
import RoleService from '../service/role.service'
import { arrayFormatter } from 'expresso-core'

export default async function roleController(fastify: FastifyInstance) {
  routeLogger('Role')

  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const data = await RoleService.findAll(request)

    const httpResponse = HttpResponse.get(data)
    return reply.status(200).send(httpResponse)
  })

  fastify.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const id: string = _.get(request, 'params.id', '')

    const data = await RoleService.findById(id)

    const httpResponse = HttpResponse.get({ data })
    return reply.status(200).send(httpResponse)
  })

  fastify.post(
    '/',
    { schema: { body: roleSchema.create }, validatorCompiler: yupValidation },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const formData = request.body as RoleAttributes

      const data = await RoleService.create(formData)

      const httpResponse = HttpResponse.created({ data })
      return reply.status(200).send(httpResponse)
    }
  )

  fastify.put(
    '/:id',
    { schema: { body: roleSchema.create }, validatorCompiler: yupValidation },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const id: string = _.get(request, 'params.id', '')
      const formData = request.body as RoleAttributes

      const data = await RoleService.update(id, formData)

      const httpResponse = HttpResponse.updated({ data })
      return reply.status(200).send(httpResponse)
    }
  )

  fastify.put(
    '/restore/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const id: string = _.get(request, 'params.id', '')

      await RoleService.restore(id)

      const httpResponse = HttpResponse.updated({})
      return reply.status(200).send(httpResponse)
    }
  )

  fastify.delete(
    '/soft-delete/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const id: string = _.get(request, 'params.id', '')

      await RoleService.softDelete(id)

      const httpResponse = HttpResponse.deleted({})
      return reply.status(200).send(httpResponse)
    }
  )

  fastify.delete(
    '/force-delete/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const id: string = _.get(request, 'params.id', '')

      await RoleService.forceDelete(id)

      const httpResponse = HttpResponse.deleted({})
      return reply.status(200).send(httpResponse)
    }
  )

  fastify.post(
    '/multiple/restore',
    {
      schema: { body: roleSchema.multipleIds },
      validatorCompiler: yupValidation,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const ids = _.get(request, 'body.ids', [])
      const newIds = arrayFormatter(ids)

      await RoleService.multipleRestore(newIds)

      const httpResponse = HttpResponse.updated({})
      return reply.status(200).send(httpResponse)
    }
  )

  fastify.post(
    '/multiple/soft-delete',
    {
      schema: { body: roleSchema.multipleIds },
      validatorCompiler: yupValidation,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const ids = _.get(request, 'body.ids', [])
      const newIds = arrayFormatter(ids)

      await RoleService.multipleSoftDelete(newIds)

      const httpResponse = HttpResponse.deleted({})
      return reply.status(200).send(httpResponse)
    }
  )
  fastify.post(
    '/multiple/force-delete',
    {
      schema: { body: roleSchema.multipleIds },
      validatorCompiler: yupValidation,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const ids = _.get(request, 'body.ids', [])
      const newIds = arrayFormatter(ids)

      await RoleService.multipleForceDelete(newIds)

      const httpResponse = HttpResponse.deleted({})
      return reply.status(200).send(httpResponse)
    }
  )
}
