'use server'

import { apiLoginUser } from "@/lib/api-requests"

export async function loginFom(formData: FormData) {
  let jsonError, error, success = false

  try {
    const data = {
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || '',
      recaptchaToken: formData.get('recaptchaToken')?.toString() || '',
    }

    try {
      await apiLoginUser(data)

      success = true
    } catch (e: any) {
      try {
        jsonError = JSON.parse(e.message)
      } catch (jError: any) {
        if (typeof e?.message === "string") {
          error = e.message
        }
      }
    }

    return { jsonError, error, success }
  } catch (e) {
    return { message: 'There was an error.' }
  }
}
