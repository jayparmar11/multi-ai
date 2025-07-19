import type { WindowProps } from './types'
import { PlusIcon, Trash2 } from 'lucide-react'
import { MAX_WINDOWS, MIN_WINDOWS } from '../constants'
import { useActiveWindowId, useWindowActions, useWindows } from '../store/windowsStore'
import { Button } from './ui/button'

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
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-1 left-1"
            onClick={(e) => {
              e.stopPropagation()
              addWindow('before')
            }}
          >
            <PlusIcon className="size-5" />
          </Button>
          <Button
            className="absolute bottom-1 right-1"
            variant="secondary"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              addWindow('after')
            }}
          >
            <PlusIcon className="size-5" />
          </Button>
        </>
      )}
      {canRemove && (
        <Button
          size="icon"
          variant="destructive"
          className="absolute bottom-1 left-1/2 -translate-x-1/2 shadow p-2"
          onClick={(e) => {
            e.stopPropagation()
            removeWindow(win.id)
          }}
        >
          <Trash2 className="size-5" />
        </Button>
      )}
    </>
  )
}

export default WindowAction
