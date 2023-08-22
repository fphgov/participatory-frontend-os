'use server'

import { cookies } from 'next/headers'

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
