import { useAuth } from '~/composables/auth/useAuth'

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const nuxt = useNuxtApp()
  const router = useRouter()
  const { isAuthenticated, user, restoreSession } = useAuth()
  await restoreSession()

  if (isAuthenticated.value && (user.value?.role === 'VENDOR' || user.value?.role === 'ADMIN')) return

  const redirect = isAuthenticated.value
    ? '/profile'
    : { path: '/auth/login', query: { role: 'vendor', redirect: to.fullPath } }

  if (nuxt.isHydrating && nuxt.payload.serverRendered) {
    // Keep the server-rendered layout in place until the client mounts it.
    nuxt.runWithContext(() => onNuxtReady(() => {
      if (router.currentRoute.value.fullPath === to.fullPath) void router.replace(redirect)
    }))
    return
  }

  return navigateTo(redirect)
})
