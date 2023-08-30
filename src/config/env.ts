import 'dotenv/config'

/**
 *
 * @param value
 * @param fallback
 * @returns
 */
function getEnv(value: any, fallback?: any): any {
  const result = process.env[value]

  // check env value
  if ([undefined, null, ''].includes(result)) {
    // check fallback
    if (fallback) {
      return fallback
    }

    return undefined
  }

  return result
}

const appEnv = {
  // Application
  NODE_ENV: getEnv('NODE_ENV', 'development'),

  APP_KEY: getEnv('APP_KEY'),
  APP_NAME: getEnv('APP_NAME', 'fastify'),
  APP_LANG: getEnv('APP_LANG', 'id'),
  APP_PORT: Number(getEnv('APP_PORT', 8000)),

  // Config
  AXIOS_TIMEOUT: getEnv('AXIOS_TIMEOUT', '5m'),
  RATE_LIMIT: Number(getEnv('RATE_LIMIT', 100)),
  RATE_DELAY: getEnv('RATE_DELAY', '5m'),
}

export const env = {
  ...appEnv,
}
