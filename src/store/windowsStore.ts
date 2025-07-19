import { create } from 'zustand'

export type WindowConfig = {
  id: string
  url: string
  active: boolean
}

type WindowsState = {
  windows: WindowConfig[]
  actions: {
    addWindow: (url?: string) => void
    removeWindow: (id: string) => void
    setActive: (id: string) => void
    setUrl: (id: string, url: string) => void
  }
}

const initialWindow: WindowConfig = {
  id: crypto.randomUUID(),
  url: '',
  active: true,
}

export const useWindowsStore = create<WindowsState>(set => ({
  windows: [initialWindow],
  actions: {
    addWindow: (url = '') => {
      const id = crypto.randomUUID()
      set(s => ({
        windows: s.windows.length < 6
          ? s.windows.map(w => ({ ...w, active: false })).concat({ id, url, active: true })
          : s.windows,
      }))
    },
    removeWindow: (id) => {
      set((s) => {
        const filtered = s.windows.filter(w => w.id !== id)
        if (filtered.length === 0)
          return { windows: [initialWindow] }
        // Set first window active if removed was active
        const wasActive = s.windows.find(w => w.id === id)?.active
        if (wasActive)
          filtered[0].active = true
        return { windows: filtered }
      })
    },
    setActive: (id) => {
      set(s => ({
        windows: s.windows.map(w => ({ ...w, active: w.id === id })),
      }))
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
export const useActiveWindow = () => useWindowsStore(s => s.windows.find(w => w.active))
