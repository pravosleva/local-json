interface IProps {
  length?: number
  allowedSymbols?: string
}

export const getRandomId = ({ length, allowedSymbols }: IProps): string => {
  let text = ''
  const possible =
    allowedSymbols ||
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const max = length || 5

  for (let i = 0; i < max; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}
