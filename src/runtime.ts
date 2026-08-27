/**
 * dsh-plugin-template — Host Remote service.
 *
 * A TypertRemoteService exposes async methods to the browser through the
 * harness Remote gateway. The @Remote decorator marks each callable method;
 * the constructor's second argument is the service key the client mounts.
 */
import type { Context } from '@deepseek-ai/cordis'
import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol'
import { nameSchema } from './contract.ts'
import type { GreetResult, ResolvedConfig } from './types.ts'

/** Host-side service backing the `greet` Remote namespace. */
export class GreetRuntime extends TypertRemoteService {
  /** @param ctx - owning Cordis context. @param config - resolved plugin config. */
  constructor(ctx: Context, private readonly config: ResolvedConfig) { super(ctx, 'greet') }

  /** Compose a greeting from the configured prefix and the caller's name. */
  @Remote
  async greet(name: string, signal?: AbortSignal): Promise<GreetResult> {
    void signal
    const checked = nameSchema.parse(name)
    const suffix = this.config.excited ? '!' : ''
    return { message: `${this.config.greeting}, ${checked}${suffix}` }
  }
}
