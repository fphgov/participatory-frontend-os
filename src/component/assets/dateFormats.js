const getHungarianDateFormat = (createdAt) => {
  const date = new Date(createdAt)

  return `${date.getFullYear()}.${("0" + (date.getMonth() + 1)).slice(-2)}.${("0" + date.getDate()).slice(-2)}`
}

const getDateFormat = (createdAt) => {
  const date = new Date(createdAt)

  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
}

export {
  getDateFormat,
  getHungarianDateFormat,
}
