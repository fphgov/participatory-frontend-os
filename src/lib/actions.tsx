'use server'

import { cookies } from 'next/headers'
import { verifyJWT } from './token'
import { User } from '@/middleware'

export async function saveToken(token: string): Promise<void> {
  const hours: number = parseInt(process.env.NEXT_TOKEN_EXPIRATION_IN_HOUR ?? "24");
  const expirationDate = new Date(Date.now() + hours * 60 * 60 * 1000);

  cookies().set({
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === "production",
    sameSite: 'lax',
    expires: expirationDate
  });
}


export async function getToken(): Promise<any> {
  return cookies().get('token')
}

export async function getValidToken(): Promise<string|null> {
  const token = (await getToken())?.value

  try {
    await verifyJWT<{ user: User }>(token || '')

    return token
  } catch (e) {}

  return null
}
