import { useAuth } from '~/composables/auth/useAuth'

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const { isAuthenticated, user, restoreSession } = useAuth()
  await restoreSession()

  if (!isAuthenticated.value) {
    return navigateTo({
      path: '/auth/login',
      query: { redirect: to.fullPath },
    })
  }

  if (user.value?.role !== 'CUSTOMER') {
    return navigateTo('/')
  }
})
