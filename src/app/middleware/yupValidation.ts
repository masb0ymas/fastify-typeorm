import { FastifySchema, FastifySchemaCompiler } from 'fastify'

interface IValidation extends FastifySchemaCompiler<FastifySchema> {
  schema: FastifySchema
  method: string
  url: string
  httpPart: string
}

export const yupOptions = {
  strict: false,
  abortEarly: false, // return all errors
  stripUnknown: true, // remove additional properties
  recursive: true,
}

export function yupValidation({
  schema,
  method,
  url,
  httpPart,
}: IValidation | any) {
  return (data: any) => {
    try {
      const result = schema.validateSync(data, yupOptions)
      return { value: result }
    } catch (err: any) {
      return { error: err }
    }
  }
}
