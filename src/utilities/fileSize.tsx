const fileSize = (size: number) => {
  if (size === 0) return '0 bájt'

  const k = 1024
  const sizes = [ 'bájt', 'KB', 'MB', 'GB', 'TB' ]
  const i = Math.floor(Math.log(size) / Math.log(k))

  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default fileSize
