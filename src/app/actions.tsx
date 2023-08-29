'use server'

import { apiLoginUser, apiLostPassword, apiResetPasswordChange, apiRegistration, apiProfileChangePassword, apiProfileActivate, apiProfileSaving } from "@/lib/api-requests"

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
    return { message: 'Váratlan hiba történt, kérünk próbáld később' }
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
    return { message: 'Váratlan hiba történt, kérünk próbáld később' }
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
    return { message: 'Váratlan hiba történt, kérünk próbáld később' }
  }
}

export async function passwordResetForm(data: any) {
  let jsonError, error, success = false, successMessage = ''

  try {
    try {
      const response = await apiResetPasswordChange(data)

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
    return { message: 'Váratlan hiba történt, kérünk próbáld később' }
  }
}

export async function profileChangePasswordForm(data: any) {
  let jsonError, error, success = false, successMessage = ''

  try {
    try {
      const response = await apiProfileChangePassword(data)

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
    return { message: 'Váratlan hiba történt, kérünk próbáld később' }
  }
}

export async function profileActivateForm(hash: string) {
  let jsonError, error, success = false, successMessage = ''

  try {
    try {
      const response = await apiProfileActivate(hash)

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
    return { message: 'Váratlan hiba történt, kérünk próbáld később' }
  }
}

export async function profileSavingForm(hash: string, data: Record<string, string|boolean>) {
  let jsonError, error, success = false, successMessage = ''

  try {
    try {
      const response = await apiProfileSaving(hash, data)

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
    return { message: 'Váratlan hiba történt, kérünk próbáld később' }
  }
}
