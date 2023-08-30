import { blue, cyan, green } from 'colorette'
import { App } from './config/app'
import { env } from './config/env'

function bootstrap() {
  const server = new App().create()

  server.listen({ port: env.APP_PORT }, (err) => {
    if (err) throw err

    const addr = server.server.address()
    const bind = typeof addr === 'string' ? `${addr}` : `${addr?.port}`

    const host = cyan(`http://localhost:${bind}`)
    const nodeEnv = blue(env.NODE_ENV)

    const msgType = green(`${env.APP_NAME}`)
    const message = `server listening on ${host} ⚡️ & env: ${nodeEnv} 🚀`

    server.log.info(`${msgType} - ${message}`)
  })
}

bootstrap()
