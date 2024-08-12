'use server'

import { apiLoginUser, apiLostPassword, apiResetPasswordChange, apiRegistration, apiProfileChangePassword, apiProfileActivate, apiProfileSaving, apiIdeaSubmission, apiProfilePersonalData, apiProfileHearAbout, apiProfileChangeNewsletter, apiProfileChangePrize, apiLoginUserWithHash, apiVote } from "@/lib/api-requests"
import ServerFormData from 'form-data'

export async function loginFom(formData: FormData) {
  let jsonError, error, success = false
  let response = null

  try {
    const data = {
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || '',
      type: formData.get('type')?.toString() || 'password',
      pathname: formData.get('pathname')?.toString() || '',
      privacy: formData.get('privacy')?.toString() || 'off',
      liveInCity: formData.get('live_in_city')?.toString() || 'off',
      newsletter: formData.get('newsletter')?.toString() || 'off',
      prize: formData.get('prize')?.toString() || 'off',
      recaptchaToken: formData.get('recaptchaToken')?.toString() || '',
    }

    try {
      response = await apiLoginUser(data)

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

    return { jsonError, error, success, token: response?.token, message: response?.message }
  } catch (e) {
    return { message: 'Váratlan hiba történt, kérünk próbáld később' }
  }
}

export async function loginWithMagicLinkForm(hash: string) {
  let jsonError, error, success = false, successMessage = ''

  try {
    try {
      const response = await apiLoginUserWithHash(hash)

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

export async function sendVoteProject(projectId: string|number): Promise<any> {
  let jsonError, error, success = false, successMessage = '', data = null

  try {
    try {
      const response = await apiVote(projectId)

      if (response.message) {
        success = true
        successMessage = response.message
        data = response.data
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

    return { jsonError, error, success, successMessage, data }
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

export async function ideaSubmissionForm(formData: FormData) {
  let jsonError, error, success = false

  try {
    try {
      const serverFormData = new ServerFormData()

      for(const formRecord of formData.entries()) {
        const key   = formRecord[0]
        const value = formRecord[1]

        if (value instanceof File) {
          const data = await value.arrayBuffer()
          const buffer = Buffer.from(data)

          serverFormData.append(key, buffer, value.name);
        } else {
          serverFormData.append(key, value)
        }
      }

      await apiIdeaSubmission(serverFormData)

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

export async function profileChangeNewsletterForm(data: any) {
  let jsonError, error, success = false, successMessage = ''

  try {
    try {
      const response = await apiProfileChangeNewsletter(data)

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

export async function profileChangePrizeForm(data: any) {
  let jsonError, error, success = false, successMessage = ''

  try {
    try {
      const response = await apiProfileChangePrize(data)

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

export async function profilePersonalForm(data: any) {
  let jsonError, error, success = false, successMessage = ''

  try {
    try {
      const response = await apiProfilePersonalData(data)

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

export async function profileHearAboutForm(data: any) {
  let jsonError, error, success = false, successMessage = ''

  try {
    try {
      const response = await apiProfileHearAbout(data)

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
