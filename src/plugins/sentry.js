import Vue from 'vue'
import router from '@/router'

import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'

export default Sentry.init({
  Vue,
  dsn: process.env.VUE_APP_SENTRY_DSN,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: [process.env.VUE_APP_SENTRY_HOST, /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})
