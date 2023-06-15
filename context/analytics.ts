import Analytics from 'analytics'
import web3Analytics from './analyticsPlugins/ceramic'

/* initialize analytics and load plugins */
const analytics = Analytics({
  debug: false,
  plugins: [
    web3Analytics({
      appId: 'pact.social.local',
      loglevel: 'info'
    }),
  ]
})

export default analytics
