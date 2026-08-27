/**
 * dsh-plugin-template — Host plugin entry.
 *
 * This is the Node half of the plugin: it declares a validated Config schema
 * (schemastery), starts the GreetRuntime Remote, and registers the Typert
 * manifest so the model layer knows about the service.
 */
import type { Context } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import type {} from '@deepseek-ai/dsh-typert-registry'
import { GreetRuntime } from './runtime.ts'
import { TYPERT_MANIFEST } from './typert.ts'
import type { ResolvedConfig } from './types.ts'

/** Cordis plugin name. Must match package.json `name` and cordis.patch.yml. */
export const name = 'dsh-plugin-template'
/** Services required before Typert registration. */
export const inject = ['typert']

/** Plugin configuration, validated and defaulted by the schema below. */
export interface Config {
  /** Greeting prefix prepended to the caller's name. */
  greeting: string
  /** Whether to append an exclamation mark. */
  excited: boolean
}

/** Configuration schema with defaults. Users override keys in cordis.patch.yml. */
export const Config = z.object({
  greeting: z.string().default('Hello'),
  excited: z.boolean().default(false),
})

/** Start the host Remote and register the Typert manifest. */
export function apply(ctx: Context, config?: Config): void {
  const resolved = Config(config ?? {}) as ResolvedConfig
  new GreetRuntime(ctx, resolved)
  ctx.effect(() => {
    const dispose = ctx.typert.register(TYPERT_MANIFEST)
    return () => { void dispose() }
  }, 'dsh-plugin-template: typert manifest')
}
