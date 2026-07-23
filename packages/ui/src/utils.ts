/** Une clases condicionalmente (mini classnames, sin dependencia). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
