import { green } from 'colorette'
import { validate as uuidValidate } from 'uuid'
import { logger } from '~/config/pino'
import ResponseError from '../modules/response/ResponseError'

/**
 *
 * @param string
 * @returns
 */
export function capitalizeFirstLetter(string: string): string {
  const regex = /[-`~!@#$%^&*_|=?;:'",<>]/gi

  const first_word = string.charAt(0).toUpperCase()
  const new_word = `${first_word}${string.slice(1)?.split(regex)?.join(' ')}`

  const split_word = new_word.split(' ')

  for (let i = 0; i < split_word.length; i += 1) {
    const first_split_word = split_word[i].charAt(0).toUpperCase()
    split_word[i] = `${first_split_word}${split_word[i].slice(1)}`
  }

  const result = split_word.join(' ')

  return result
}

/**
 *
 * @param value
 * @param options
 * @returns
 */
export function validateUUID(value: string): string {
  if (!uuidValidate(value)) {
    throw new ResponseError.BadRequest('incorrect uuid format')
  }

  return value
}

/**
 *
 * @param route
 */
export function routeLogger(route: string) {
  const msgType = green('routes')

  const routeDir = green(route)
  const message = `controller ${routeDir} registered`

  logger.info(`${msgType} - ${message}`)
}
