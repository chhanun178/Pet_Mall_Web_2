import { useAuth } from '~/composables/auth/useAuth'

export default defineNuxtPlugin(async () => {
  const { restoreSession } = useAuth()
  await restoreSession()
})
