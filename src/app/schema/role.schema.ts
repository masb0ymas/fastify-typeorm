import * as yup from 'yup'

const create = yup
  .object({
    name: yup.string().required('name is required'),
  })
  .required()

const multipleIds = yup
  .object({
    ids: yup.lazy((val) =>
      Array.isArray(val)
        ? yup.array().of(yup.string().required('ids is required'))
        : yup.string().required('ids is required')
    ),
  })
  .required()

const roleSchema = { create, multipleIds }

export default roleSchema
