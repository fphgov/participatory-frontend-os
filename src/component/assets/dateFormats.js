const getHungarianDateFormat = (rawFormat) => {
  const date = new Date(rawFormat)

  return `${date.getFullYear()}.${("0" + (date.getMonth() + 1)).slice(-2)}.${("0" + date.getDate()).slice(-2)}`
}

const getDateFormat = (rawFormat) => {
  const date = new Date(rawFormat)

  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
}

const getDateLocalFormat = (rawFormat) => {
  const date = new Date(rawFormat)

  return `${date.getUTCFullYear()}-${("0" + (date.getUTCMonth() + 1)).slice(-2)}-${("0" + date.getUTCDate()).slice(-2)}T${date.getUTCHours()}:${date.getUTCMinutes()}`
}

const getFullDateFormat = (rawFormat) => {
  const date = new Date(rawFormat)

  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${("0" + date.getUTCHours()).slice(-2)}:${("0" + date.getUTCMinutes()).slice(-2)}:${("0" + date.getUTCSeconds()).slice(-2)}`
}

export {
  getDateFormat,
  getHungarianDateFormat,
  getDateLocalFormat,
  getFullDateFormat,
}
