import { jwtVerify } from "jose"

export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY)
      )
    ).payload as T
  } catch (error: any) {
    throw new Error(error.message)
  }
}
