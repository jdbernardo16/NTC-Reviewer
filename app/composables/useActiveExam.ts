import type { ExamSession } from '~/utils/exam'
import { EXAM_EVENT, loadSession } from '~/utils/exam'

/**
 * Keeps a reactive view of the active exam session for global UI such as the
 * header "exam in progress" pill. The source of truth remains localStorage.
 */
export function useActiveExam() {
  const session = useState<ExamSession | null>('active-exam', () => null)
  const route = useRoute()

  function refresh() {
    if (!import.meta.client) return
    session.value = loadSession()
  }

  function onStorageChange() {
    refresh()
  }

  onMounted(() => {
    refresh()
    window.addEventListener(EXAM_EVENT, onStorageChange)
    window.addEventListener('storage', onStorageChange)
  })

  onBeforeUnmount(() => {
    window.removeEventListener(EXAM_EVENT, onStorageChange)
    window.removeEventListener('storage', onStorageChange)
  })

  watch(() => route.fullPath, refresh)

  return { session, refresh }
}
