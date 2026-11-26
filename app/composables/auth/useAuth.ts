import type {
  AuthResponse,
  AuthUser,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterCustomerPayload,
  RegisterResponse,
  ResendOtpPayload,
  ResetPasswordPayload,
  VerifyOtpPayload,
} from '~/types/auth'

let inflightRefresh: Promise<AuthResponse | null> | null = null

export const useAuth = () => {
  const config = useRuntimeConfig()
  const apiBase = (config.public.apiBase as string) || 'http://localhost:4000'

  const accessToken = useState<string | null>('pm_access_token', () => null)
  const user = useState<AuthUser | null>('pm_auth_user', () => null)
  const initialized = useState<boolean>('pm_auth_initialized', () => false)
  const loading = useState<boolean>('pm_auth_loading', () => false)

  const isAuthenticated = computed(() => Boolean(accessToken.value && user.value))
  const isVendor = computed(() => user.value?.role === 'VENDOR')
  const isCustomer = computed(() => user.value?.role === 'CUSTOMER')

  const displayName = computed(() => {
    if (!user.value) return ''
    if (user.value.vendorProfile?.storeName) return user.value.vendorProfile.storeName
    if (user.value.customerProfile?.fullName) return user.value.customerProfile.fullName
    return user.value.email.split('@')[0] || 'Pet Mall User'
  })

  const initials = computed(() => {
    const name = displayName.value.trim()
    if (!name) return 'PM'
    const parts = name.split(/\s+/).filter(Boolean)
    if (parts.length >= 2) {
      return `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}`.toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  })

  function setSession(data: AuthResponse) {
    accessToken.value = data.accessToken
    user.value = data.user
    initialized.value = true
  }

  function clearSession() {
    accessToken.value = null
    user.value = null
  }

  async function login(payload: LoginPayload): Promise<AuthResponse> {
    loading.value = true
    try {
      const data = await $fetch<AuthResponse>(`${apiBase}/api/v1/auth/login`, {
        method: 'POST',
        body: payload,
        credentials: 'include',
      })
      setSession(data)
      return data
    } finally {
      loading.value = false
    }
  }

  async function registerCustomer(payload: RegisterCustomerPayload): Promise<RegisterResponse> {
    loading.value = true
    try {
      return await $fetch<RegisterResponse>(`${apiBase}/api/v1/auth/register`, {
        method: 'POST',
        body: payload,
        credentials: 'include',
      })
    } finally {
      loading.value = false
    }
  }

  async function verifyCustomerOtp(payload: VerifyOtpPayload): Promise<AuthResponse> {
    loading.value = true
    try {
      const data = await $fetch<AuthResponse>(`${apiBase}/api/v1/auth/verify-otp`, {
        method: 'POST',
        body: payload,
        credentials: 'include',
      })
      setSession(data)
      return data
    } finally {
      loading.value = false
    }
  }

  async function resendCustomerOtp(payload: ResendOtpPayload): Promise<{ message: string }> {
    loading.value = true
    try {
      return await $fetch<{ message: string }>(`${apiBase}/api/v1/auth/resend-otp`, {
        method: 'POST',
        body: payload,
        credentials: 'include',
      })
    } finally {
      loading.value = false
    }
  }

  async function requestPasswordReset(
    payload: ForgotPasswordPayload,
  ): Promise<{ message: string }> {
    loading.value = true
    try {
      return await $fetch<{ message: string }>(`${apiBase}/api/v1/auth/forgot-password`, {
        method: 'POST',
        body: payload,
      })
    } finally {
      loading.value = false
    }
  }

  async function resetPasswordWithOtp(
    payload: ResetPasswordPayload,
  ): Promise<{ message: string }> {
    loading.value = true
    try {
      return await $fetch<{ message: string }>(`${apiBase}/api/v1/auth/reset-password`, {
        method: 'POST',
        body: payload,
      })
    } finally {
      loading.value = false
    }
  }

  async function refreshSession(): Promise<AuthResponse | null> {
    if (inflightRefresh) {
      return inflightRefresh
    }

    inflightRefresh = (async () => {
      try {
        const data = await $fetch<AuthResponse>(`${apiBase}/api/v1/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        })
        setSession(data)
        return data
      } catch {
        clearSession()
        initialized.value = true
        return null
      } finally {
        inflightRefresh = null
      }
    })()

    return inflightRefresh
  }

  async function restoreSession(): Promise<AuthUser | null> {
    if (initialized.value) {
      return user.value
    }
    const refreshed = await refreshSession()
    return refreshed?.user ?? null
  }

  async function fetchCurrentUser(): Promise<AuthUser | null> {
    const res = await authorizedFetch<{ user: AuthUser }>('/api/v1/auth/me')
    user.value = res.user
    return res.user
  }

  async function logout(redirectTo = '/auth/login'): Promise<void> {
    loading.value = true
    try {
      await $fetch(`${apiBase}/api/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch {
      // Clear client state even if network logout fails
    } finally {
      clearSession()
      initialized.value = true
      loading.value = false
      await navigateTo(redirectTo)
    }
  }

  async function authorizedFetch<T>(
    path: string,
    options: Parameters<typeof $fetch>[1] = {},
  ): Promise<T> {
    const request = (token: string | null) =>
      $fetch<T>(`${apiBase}${path}`, {
        ...options,
        credentials: 'include',
        headers: {
          ...(options?.headers ?? {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })

    try {
      return await request(accessToken.value)
    } catch (error: unknown) {
      const status =
        (error as { statusCode?: number; response?: { status?: number } })?.statusCode ??
        (error as { response?: { status?: number } })?.response?.status
      if (status === 401) {
        const refreshed = await refreshSession()
        if (refreshed?.accessToken) {
          return await request(refreshed.accessToken)
        }
      }
      throw error
    }
  }

  return {
    accessToken: readonly(accessToken),
    user: readonly(user),
    initialized: readonly(initialized),
    loading: readonly(loading),
    isAuthenticated,
    isVendor,
    isCustomer,
    displayName,
    initials,
    login,
    registerCustomer,
    verifyCustomerOtp,
    resendCustomerOtp,
    requestPasswordReset,
    resetPasswordWithOtp,
    refreshSession,
    restoreSession,
    fetchCurrentUser,
    logout,
    authorizedFetch,
  }
}
