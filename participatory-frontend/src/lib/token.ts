import { jwtVerify } from "jose"

export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.APP_JWT_SECRET_KEY)
      )
    ).payload as T
  } catch (error) {
    console.log(error)
    throw new Error("Your token has expired.")
  }
}
