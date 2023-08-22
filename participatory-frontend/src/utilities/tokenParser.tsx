import jwtDecode from "jwt-decode"

export const tokenParser = function(token: string|undefined, key: string): string|null {
  if (! token) {
    return null
  }

  const decodedJwt = jwtDecode(token)

  let decoded: any = decodedJwt

  key.split('.').forEach((k) => {
    decoded = decoded && decoded[k] || null
  })

  return decoded
}
