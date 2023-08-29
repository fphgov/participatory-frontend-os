'use server'

import { apiLoginUser, apiLostPassword, apiRegistration } from "@/lib/api-requests"

function getFormData(formData: FormData, name: string): string {
  return formData.get(name)?.toString() || ''
}

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

export async function registrationFom(data: any) {
  let jsonError, error, success = false

  try {
    try {
      await apiRegistration(data)

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

export async function forgotPasswordForm(data: any) {
  let jsonError, error, success = false, successMessage = ''

  try {
    try {
      const response = await apiLostPassword(data)

      if (response.message) {
        success = true
        successMessage = response.message
      }
    } catch (e: any) {
      try {
        jsonError = JSON.parse(e.message)
      } catch (jError: any) {
        if (typeof e?.message === "string") {
          error = e.message
        }
      }
    }

    return { jsonError, error, success, successMessage }
  } catch (e) {
    return { message: 'There was an error.' }
  }
}
