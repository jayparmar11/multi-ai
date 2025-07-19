import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MAX_WINDOWS } from '../constants'

export type WindowConfig = {
  id: string
  url: string
}

type WindowsState = {
  windows: WindowConfig[]
  activeWindowId: string
  actions: {
    addWindow: (position: 'before' | 'after', url?: string) => void
    removeWindow: (id: string) => void
    setActive: (id: string) => void
    setUrl: (id: string, url: string) => void
  }
}

const createInitialWindow: () => WindowConfig = () => ({
  id: crypto.randomUUID(),
  url: '',
})

const initialWindow: WindowConfig = createInitialWindow()

export const useWindowsStore = create<WindowsState>()(
  persist(
    set => ({
      windows: [createInitialWindow(), initialWindow, createInitialWindow()],
      activeWindowId: initialWindow.id,
      actions: {
        addWindow: (position, url = '') => {
          const id = crypto.randomUUID()
          set((s) => {
            if (s.windows.length >= MAX_WINDOWS)
              return { windows: s.windows, activeWindowId: s.activeWindowId }
            const activeIdx = s.windows.findIndex(w => w.id === s.activeWindowId)
            const newWindows = [...s.windows]
            if (position === 'before') {
              newWindows.splice(activeIdx, 0, { id, url })
            }
            else {
              newWindows.splice(activeIdx + 1, 0, { id, url })
            }
            return { windows: newWindows, activeWindowId: id }
          })
        },
        removeWindow: (id) => {
          set((s) => {
            const filteredWindows = []
            for (let i = 0; i < s.windows.length; i++) {
              if (s.windows[i].id !== id) {
                filteredWindows.push(s.windows[i])
              }
              else if (s.windows[i].id === id) {
                if (s.windows?.[i - 1]?.id) {
                  s.activeWindowId = s.windows[i - 1].id
                }
                else if (s.windows?.[i + 1]?.id) {
                  s.activeWindowId = s.windows[i + 1].id
                }
              }
            }

            return { windows: filteredWindows, activeWindowId: s.activeWindowId }
          })
        },
        setActive: (id) => {
          set((s) => {
            const windowExists = s.windows.some(w => w.id === id)
            if (!windowExists)
              return s
            return { activeWindowId: id }
          })
        },
        setUrl: (id, url) => {
          set(s => ({
            windows: s.windows.map(w => w.id === id ? { ...w, url } : w),
          }))
        },
      },
    }),
    {
      name: 'multi-app-windows',
      partialize: state => ({ windows: state.windows, activeWindowId: state.activeWindowId }),
    },
  ),
)

export const useWindows = () => useWindowsStore(s => s.windows)
export const useWindowActions = () => useWindowsStore(s => s.actions)
export const useActiveWindowId = () => useWindowsStore(s => s.activeWindowId)
export function useActiveWindow() {
  const windows = useWindowsStore(s => s.windows)
  const activeId = useWindowsStore(s => s.activeWindowId)
  return windows.find(w => w.id === activeId)
}
