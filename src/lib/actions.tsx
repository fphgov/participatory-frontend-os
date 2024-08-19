'use server'

import { cookies } from 'next/headers'
import { verifyJWT } from './token'
import { User } from '@/middleware'

export async function saveToken(token: string) {
  const hours = 1 * 60 * 60 * 1000

  cookies().set({
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
    expires: Date.now() + hours
  })
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
