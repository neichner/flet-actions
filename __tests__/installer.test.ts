/**
 * Unit tests for src/installer.ts
 */

import which from 'which'
import * as installer from '../src/installer'
import { Platform } from '../src/platform'

jest.mock('which')

describe('installer.ts', () => {
  it('Everything already installed should return error null', async () => {
    ;(which as any).mockResolvedValue(true)
    const error = await installer.installDependencies(Platform.Windows)
    expect(which).toHaveBeenCalledTimes(3)
    expect(error).toBe(null)
  })

  it('Pip not found, expect error response', async () => {
    ;(which as any).mockResolvedValue(null)
    const error = await installer.installDependencies(Platform.Windows)
    expect(which).toHaveBeenCalledTimes(1)
    expect(error?.message).toBe(
      'Expected pip to be installed, install python before running this command'
    )
  })
})
