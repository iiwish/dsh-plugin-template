import { describe, expect, it } from 'vitest'
import { DSH_TEMPLATE_INVOCATIONS, greetResultSchema, nameSchema } from '../src/contract.ts'
import { DSH_TEMPLATE_REMOTE } from '../src/client/remote.ts'
import { TYPERT_MANIFEST } from '../src/typert.ts'

describe('dsh-plugin-template wire contract', () => {
  it('shares the same descriptor list between host and client', () => {
    expect(DSH_TEMPLATE_INVOCATIONS).toHaveLength(1)
    expect(TYPERT_MANIFEST.invocations).toBe(DSH_TEMPLATE_INVOCATIONS)
    expect(DSH_TEMPLATE_REMOTE.descriptors).toBe(DSH_TEMPLATE_INVOCATIONS)
    expect(DSH_TEMPLATE_INVOCATIONS[0]?.id).toBe('dsh-plugin-template#greet/greet')
  })

  it('validates primitive wire values and rejects unsafe input', () => {
    expect(nameSchema.parse('  DSH  ')).toBe('DSH')
    expect(() => nameSchema.parse('')).toThrow()
    expect(() => nameSchema.parse('   ')).toThrow()
    expect(() => nameSchema.parse('x'.repeat(201))).toThrow()
  })

  it('validates the greeting result projection', () => {
    expect(greetResultSchema.parse({ message: 'Hello, DSH!' }).message).toBe('Hello, DSH!')
    expect(() => greetResultSchema.parse({ message: 42 })).toThrow()
  })
})
