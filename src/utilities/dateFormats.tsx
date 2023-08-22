export const getHungarianDateFormat = (rawFormat: string) => {
  const date = new Date(rawFormat)

  return `${date.getFullYear()}.${("0" + (date.getMonth() + 1)).slice(-2)}.${("0" + date.getDate()).slice(-2)}.`
}

export const getDateFormat = (rawFormat: string) => {
  const date = new Date(rawFormat)

  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
}

export const getDateLocalFormat = (rawFormat: string) => {
  const date = new Date(rawFormat)

  return `${date.getUTCFullYear()}-${("0" + (date.getUTCMonth() + 1)).slice(-2)}-${("0" + date.getUTCDate()).slice(-2)}T${date.getUTCHours()}:${date.getUTCMinutes()}`
}

export const getFullDateFormat = (rawFormat: string) => {
  const date = new Date(rawFormat)

  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${("0" + date.getUTCHours()).slice(-2)}:${("0" + date.getUTCMinutes()).slice(-2)}:${("0" + date.getUTCSeconds()).slice(-2)}`
}
