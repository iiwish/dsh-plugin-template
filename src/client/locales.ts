/**
 * dsh-plugin-template — Product copy for the greet view (zh / en).
 *
 * Register the namespace in client/index.tsx via `ctx.locale.register`, and
 * keep every key present in both dictionaries. The framework's `t` already
 * interpolates `{name}` template params, so no local formatter is needed.
 */
import type { TranslateNS } from '@deepseek-ai/dsh-client-ui-slots'

export const zh = {
  'view.label': '问候',
  'view.title': '问候示例',
  'view.loading': '正在调用问候服务…',
  'view.error': '问候失败：{message}',
  'view.defaultName': 'DSH',
} satisfies Record<string, string>
export type TemplateKey = keyof typeof zh

declare module '@deepseek-ai/dsh-client-ui-slots' { interface LocaleNamespaceMap { 'dsh-plugin-template': TemplateKey } }

export const en = {
  'view.label': 'Greet',
  'view.title': 'Greeting demo',
  'view.loading': 'Calling the greet service…',
  'view.error': 'Greeting failed: {message}',
  'view.defaultName': 'DSH',
} satisfies Record<TemplateKey, string>

export const NS = 'dsh-plugin-template'

/** Namespace-bound translate function; params are interpolated into `{name}` slots. */
export type Translate = TranslateNS<typeof NS>
