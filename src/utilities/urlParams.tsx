export const addUniqParam = (searchParams: Record<string, string>, name: string, value: string) => {
  const paramArray = searchParams?.[name] ? searchParams?.[name]?.replace(/%2C/g, ',')?.split(',') : []

  if (paramArray.includes(value)) {
    return paramArray.filter(p => p !== value).join(',')
  }

  paramArray.push(value)

  return paramArray.join(',')
}
