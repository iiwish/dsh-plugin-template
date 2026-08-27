/**
 * dsh-plugin-template — Client Remote contribution and typed namespace face.
 *
 * `TypertRemoteNamespace$6772656574` is the hex encoding of the service key
 * "greet" (g=67 r=72 e=65 e=65 t=74). Keep this name and the TypertRemoteMap
 * keys in sync with the `id`s in contract.ts when you rename the service.
 */
import type { RemoteResult, TypertRemoteContribution } from '@deepseek-ai/dsh-typert-protocol'
import type { GreetResult } from '../types.ts'
import { DSH_TEMPLATE_INVOCATIONS } from '../contract.ts'

/** Client contribution for the greet Remote. */
export const DSH_TEMPLATE_REMOTE: TypertRemoteContribution = { package: 'dsh-plugin-template', descriptors: DSH_TEMPLATE_INVOCATIONS }

declare module '@deepseek-ai/dsh-typert-protocol' {
  /** The mounted greet namespace face. */
  interface TypertRemoteNamespace$6772656574 {
    greet: (name: string, signal?: AbortSignal) => Promise<RemoteResult<GreetResult>>
  }
  interface TypertRemoteMap {
    'greet/greet': TypertRemoteNamespace$6772656574['greet']
  }
  interface TypertRemoteNamespaceMap { greet: TypertRemoteNamespace$6772656574 }
}
