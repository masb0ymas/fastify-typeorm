import { green } from 'colorette'
import i18next from 'i18next'
import middleware from 'i18next-http-middleware'
import { logger } from './pino'

/**
 * i18n
 */
void i18next.use(middleware.LanguageDetector).init(
  {
    lng: 'id',
    fallbackLng: 'id',
    preload: ['en', 'id'],
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: 'assets/locales/{{lng}}/{{ns}}.json',
    },
  },
  (err, _t) => {
    if (err) {
      console.error(err)
      return
    }

    const msgType = green(`i18next`)
    logger.info(`${msgType} - translation is ready...`)
  }
)

export const i18n = i18next
