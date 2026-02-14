import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'rtt3hnlz',
    dataset: 'production'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {
    autoUpdates: true,
    appId: 'l5o6hbiexi104vjaqh9it3ny'
  }
})
