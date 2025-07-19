import type { WindowProps } from './types'
import { Trash2 } from 'lucide-react'
import { MAX_WINDOWS, MIN_WINDOWS } from '../constants'
import { useActiveWindowId, useWindowActions, useWindows } from '../store/windowsStore'

function WindowAction({ win }: WindowProps) {
  const { addWindow, removeWindow } = useWindowActions()
  const windows = useWindows()
  const activeWindowId = useActiveWindowId()
  const isActive = win.id === activeWindowId
  const canAdd = windows.length < MAX_WINDOWS
  const canRemove = windows.length > MIN_WINDOWS
  return (
    <>
      {isActive && canAdd && (
        <>
          <button
            className="absolute bottom-4 left-4 bg-white rounded-full shadow p-2 hover:bg-gray-100 transition"
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              addWindow('before')
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </button>
          <button
            className="absolute bottom-4 right-4 bg-white rounded-full shadow p-2 hover:bg-gray-100 transition"
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              addWindow('after')
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </button>
        </>
      )}
      {canRemove && (
        <button
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full shadow p-2 hover:bg-red-100 text-red-500 transition ${isActive ? '' : 'opacity-80'}`}
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            removeWindow(win.id)
          }}
        >
          <Trash2 />
        </button>
      )}
    </>
  )
}

export default WindowAction
