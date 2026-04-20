export function formatPhoneForDisplay(phone: string | undefined | null): string {
  if (!phone) return ''
  const original = String(phone)
  const digits = original.replace(/\D/g, '')
  if (!digits) return original

  const groupLast8 = (d: string) =>
    `${d[0]} ${d.slice(1, 3)} ${d.slice(3, 5)} ${d.slice(5, 7)} ${d.slice(7, 9)}`

  // +262 / 00262 international Réunion
  if (digits.startsWith('262')) {
    const rest = digits.slice(3)
    if (rest.length === 9) {
      return `+262 ${groupLast8(rest)}`
    }
  }

  // +33 / 0033 international métropole
  if (digits.startsWith('33')) {
    const rest = digits.slice(2)
    if (rest.length === 9) {
      return `+33 ${groupLast8(rest)}`
    }
  }

  // Formats locaux 10 chiffres commençant par 0
  if (digits.length === 10 && digits.startsWith('0')) {
    const rest = digits.slice(1)
    // Réunion : 0262, 0263, 0692, 0693
    if (
      digits.startsWith('0262') ||
      digits.startsWith('0263') ||
      digits.startsWith('0692') ||
      digits.startsWith('0693')
    ) {
      return `+262 ${groupLast8(rest)}`
    }
    // Métropole : tout autre 0X
    return `+33 ${groupLast8(rest)}`
  }

  return original
}
