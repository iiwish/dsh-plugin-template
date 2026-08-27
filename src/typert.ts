/**
 * dsh-plugin-template — Host Typert model manifest for the greet Remote.
 *
 * This manifest describes the plugin's services and methods to the model
 * layer. Keep `invocations` in lockstep with contract.ts (they share the
 * same descriptor list), and list every method exposed by the runtime here.
 */
import type { TypertContribution } from '@deepseek-ai/dsh-typert-registry/types'
import { DSH_TEMPLATE_INVOCATIONS } from './contract.ts'

/** Host manifest for the greet Remote. */
export const TYPERT_MANIFEST: TypertContribution = {
  package: 'dsh-plugin-template', face: 'host', schemas: [],
  model: {
    services: [{ key: 'greet', exportName: 'GreetRuntime', description: 'Greet the caller by name.', tags: [], members: [
      { kind: 'method', name: 'greet', signature: 'greet(name: string, signal?: AbortSignal): Promise<GreetResult>' },
    ], types: [] }], events: [], objects: [],
  },
  invocations: DSH_TEMPLATE_INVOCATIONS,
}
