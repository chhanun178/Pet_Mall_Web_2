import { useAuth } from '~/composables/auth/useAuth'

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return

  const { isAuthenticated, restoreSession } = useAuth()
  await restoreSession()

  if (isAuthenticated.value) {
    return navigateTo('/')
  }
})
