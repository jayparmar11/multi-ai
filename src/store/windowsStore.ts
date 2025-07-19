import { create } from 'zustand'
import { MAX_WINDOWS, MIN_WINDOWS } from '../constants'

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

const initialWindow: WindowConfig = {
  id: crypto.randomUUID(),
  url: '',
}

export const useWindowsStore = create<WindowsState>(set => ({
  windows: [initialWindow],
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
        const filtered = s.windows.filter(w => w.id !== id)
        let newActiveId = s.activeWindowId
        if (filtered.length < MIN_WINDOWS) {
          return { windows: [initialWindow], activeWindowId: initialWindow.id }
        }
        if (s.activeWindowId === id) {
          newActiveId = filtered[0].id
        }
        return { windows: filtered, activeWindowId: newActiveId }
      })
    },
    setActive: (id) => {
      set(_s => ({ activeWindowId: id }))
    },
    setUrl: (id, url) => {
      set(s => ({
        windows: s.windows.map(w => w.id === id ? { ...w, url } : w),
      }))
    },
  },
}))

export const useWindows = () => useWindowsStore(s => s.windows)
export const useWindowActions = () => useWindowsStore(s => s.actions)
export const useActiveWindowId = () => useWindowsStore(s => s.activeWindowId)
export function useActiveWindow() {
  const windows = useWindowsStore(s => s.windows)
  const activeId = useWindowsStore(s => s.activeWindowId)
  return windows.find(w => w.id === activeId)
}
