import {
  ConfigValue,
  ConfigContext,
  App as IdifyApp,
  defaultConfig,
} from './common/index'

/**
 * Configuration object for the application.
 * 
 * If the application is running in development mode (`import.meta.env.DEV` is true),
 * the configuration will include:
 * - `showGithubLink`: A boolean indicating whether to show the GitHub link.
 * - `segment`: An object containing:
 *   - `publicPath`: A string specifying the public path to the background removal module.
 * 
 * If the application is not running in development mode, the configuration will default to `defaultConfig`.
 * 
 * @type {ConfigValue}
 */
const config: ConfigValue = import.meta.env.DEV
  ? {
      showGithubLink: true,
      segment: {
        publicPath: '/node_modules/@imgly/background-removal/dist/',
      },
    }
  : defaultConfig

export default function App() {
  return (
    <ConfigContext.Provider value={config}>
      <IdifyApp />
    </ConfigContext.Provider>
  )
}
