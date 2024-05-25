/**
 * Unit tests for src/cmd.ts
 */

import { cmd } from '../src/cmd'
import { expect } from '@jest/globals'

describe('cmd.ts', () => {
  it('Runs echo and returns exit code 0', async () => {
    await expect((await cmd('echo', 'test')).code).toBe(0)
  })

  it('Do an invalid command, expect it to fail', async () => {
    await expect((await cmd('bash', 'test')).code).toBeGreaterThan(0)
  })

  it('Where command should return a result', async () => {
    await expect((await cmd('echo', 'test')).result).toContain('test')
  })
})
