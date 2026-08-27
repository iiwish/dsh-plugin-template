/**
 * dsh-plugin-template — Minimal conversation view.
 *
 * Demonstrates the smallest useful client plugin: mount a Remote, call it
 * once on mount, and render the result. Replace the body with real UI.
 */
import { useEffect, useState } from 'react'
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { GreetResult } from '../types.ts'
import type { Translate } from './locales.ts'

// Re-declare the conversation.view slot entry so this plugin can type its
// registration without depending on ui-conversation.
declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface SlotMap {
    'conversation.view': {
      kind: 'list'
      scope: 'session'
      owner: { inspect?: { callId: string } | null; onInspectDone?: () => void }
    }
  }
}

/** Runtime shape the mounted greet namespace actually returns. */
type RemoteResult<T> = { ok: true; value: T } | { ok: false; error: { message: string } }

/** Actions passed from the client entry into the view. */
export interface GreetActions {
  greet: (name: string) => Promise<RemoteResult<GreetResult>>
}

/** Props the view-tab slot component receives (slot runtime + inject face). */
export type TemplateViewSlotProps = PropsRuntime<'conversation.view'> & {
  actions: GreetActions
  t: Translate
}

/** Minimal props of the {@link TemplateView} body component. */
export interface TemplateViewProps {
  actions: GreetActions
  t: Translate
}

/** Render the greeting returned by the host Remote. */
export function TemplateView({ actions, t }: TemplateViewProps) {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    void actions.greet(t('view.defaultName'))
      .then((result) => {
        if (cancelled) return
        if (result.ok) setMessage(result.value.message)
        else setError(result.error.message)
      })
      .catch((reason: unknown) => { if (!cancelled) setError(reason instanceof Error ? reason.message : String(reason)) })
    return () => { cancelled = true }
  }, [actions, t])

  return (
    <div className="dsh-template-view">
      <h1>{t('view.title')}</h1>
      {error !== '' ? <p className="dsh-template-error">{t('view.error', { message: error })}</p> : <p>{message !== '' ? message : t('view.loading')}</p>}
    </div>
  )
}
