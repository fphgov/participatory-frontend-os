export const getNewUrlSearchParams = (params: Record<string, string>) => {
  const filteredParams = Object.entries(params).filter(([key, value]) => value !== '')

  return new URLSearchParams(filteredParams)
}
