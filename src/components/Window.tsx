import type { WindowProps } from './types'
import { motion } from 'framer-motion'
import { INACTIVE_WINDOW_SIZE } from '@/constants'
import { cn } from '@/lib/utils'
import { useActiveWindowId, useWindowActions, useWindows } from '../store/windowsStore'
import WindowAction from './WindowAction'
import WindowAddressBar from './WindowAddressBar'
import WindowIframe from './WindowIframe'

export default function Window({ win }: WindowProps) {
  const { setActive } = useWindowActions()
  const windows = useWindows()
  const activeWindowId = useActiveWindowId()
  const isActive = win.id === activeWindowId
  return (
    <motion.div
      layout
      id={win.id}
      transition={{ duration: 0.3 }}
      className={cn('h-full cursor-pointer shadow-sm px-0.5 py-1 ')}
      exit={{
        width: 0,
      }}
      animate={{
        flex: isActive ? '1' : '0 1 auto',
        width: isActive ? `calc(100vw - ${INACTIVE_WINDOW_SIZE} * ${windows.length})` : INACTIVE_WINDOW_SIZE,
        zIndex: isActive ? 10 : 0,
      }}
      onClick={() => !isActive && setActive(win.id)}
    >
      <div className={cn('flex relative h-full flex-col items-stretch rounded-md border-black', isActive ? 'bg-slate-200 dark:bg-slate-900 outline-2 outline-slate-300 dark:outline-slate-500' : 'bg-slate-300 dark:bg-slate-600')}>
        {isActive && <WindowAddressBar win={win} />}
        {!isActive && (
          <div className="flex flex-col justify-center items-center h-full w-full select-none">
            <div className="-rotate-90 whitespace-nowrap text-xs text-slate-600 dark:text-slate-300 font-bold max-w-md overflow-hidden text-ellipsis">
              {win.url ? win.url : 'No URL'}
            </div>
          </div>
        )}
        <div className={cn(`flex-1 w-full`, isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
          <WindowIframe win={win} />
        </div>
        <WindowAction win={win} />
      </div>
    </motion.div>
  )
}
