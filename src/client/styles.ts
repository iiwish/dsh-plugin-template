/**
 * dsh-plugin-template client stylesheet. Colors ride the DeepSeek theme
 * tokens (`--dsw-*` / `--ds-*`) with neutral fallbacks only, so the view
 * follows the active theme. Class names are stable and namespaced.
 */
const STYLE_ID = 'dsh-plugin-template-styles'

const css = `
.dsh-template-view{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:24px;box-sizing:border-box;color:var(--dsw-alias-label-primary,#111111);font:var(--dsw-font-xs-13,13px/20px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif)}
.dsh-template-view h1{margin:0;font:var(--dsw-font-xs-strong-13,500 13px/20px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif)}
.dsh-template-view p{margin:0;color:var(--dsw-alias-label-secondary,#555555)}
.dsh-template-error{color:var(--dsw-alias-state-error-primary,#d1242f)}
`

/** Inject the view stylesheet once. */
export function adoptStyles(): void {
  if (document.getElementById(STYLE_ID) !== null) return
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = css
  document.head.appendChild(style)
}
