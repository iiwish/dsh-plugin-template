import { describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import { GreetRuntime } from '../src/runtime.ts'
import type { ResolvedConfig } from '../src/types.ts'

const config: ResolvedConfig = { greeting: 'Hello', excited: false }

describe('GreetRuntime', () => {
  it('composes a greeting from the configured prefix', async () => {
    const runtime = new GreetRuntime(new Context(), config)
    await expect(runtime.greet('DSH')).resolves.toEqual({ message: 'Hello, DSH' })
  })

  it('appends an exclamation mark when excited is enabled', async () => {
    const runtime = new GreetRuntime(new Context(), { greeting: 'Hi', excited: true })
    await expect(runtime.greet('World')).resolves.toEqual({ message: 'Hi, World!' })
  })

  it('rejects an empty name through the wire codec', async () => {
    const runtime = new GreetRuntime(new Context(), config)
    await expect(runtime.greet('   ')).rejects.toThrow()
  })
})
