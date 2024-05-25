import * as core from '@actions/core'
import { installDependencies } from './installer'
import { Platform } from './platform'
import { build } from './fletbuilder'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const platform: string = core.getInput('platform')
    const platformType = (() => {
      switch (platform) {
        case 'ios':
          return Platform.iOS
        case 'android':
          return Platform.Android
        case 'linux':
          return Platform.Linux
        case 'windows':
          return Platform.Windows
        case 'macos':
          return Platform.MacOs
      }
      return Platform.Windows
    })()

    await installDependencies(platformType)
    await build(platformType)

    // Set outputs for other workflow steps to use
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
