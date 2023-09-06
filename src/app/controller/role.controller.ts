import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import _ from 'lodash'
import HttpResponse from '~/core/modules/response/HttpResponse'
import { routeLogger } from '~/core/utils/formatter'
import { yupValidation } from '../middleware/yupValidation'
import roleSchema from '../schema/role.schema'
import RoleService from '../service/role.service'

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
      const formData = request.body

      console.log(formData)

      // @ts-expect-error
      const data = await RoleService.create(formData)

      const httpResponse = HttpResponse.get({ data })
      return reply.status(200).send(httpResponse)
    }
  )
}
