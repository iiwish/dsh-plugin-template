/**
 * dsh-plugin-template — Shared host/client types.
 *
 * Replace these with the wire types your plugin actually moves between the
 * host (Node) and client (browser) halves. Keep the two halves in sync by
 * importing from this single file and from contract.ts.
 */

/** Resolved host configuration (the validated Config from index.ts). */
export interface ResolvedConfig {
  /** Greeting prefix prepended to the caller's name. */
  greeting: string
  /** Whether to append an exclamation mark. */
  excited: boolean
}

/** Result of a greet call, returned from host to client. */
export interface GreetResult {
  /** The fully composed greeting message. */
  message: string
}
