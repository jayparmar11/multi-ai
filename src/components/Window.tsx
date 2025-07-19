import type { WindowProps } from './types'
import { motion } from 'framer-motion'
import { useActiveWindowId, useWindowActions } from '../store/windowsStore'
import WindowAction from './WindowAction'
import WindowAddressBar from './WindowAddressBar'
import WindowIframe from './WindowIframe'

export default function Window({ win }: WindowProps) {
  const { setActive } = useWindowActions()
  const activeWindowId = useActiveWindowId()
  const isActive = win.id === activeWindowId
  return (
    <motion.div
      layout
      id={win.id}
      transition={{ duration: 0.3 }}
      className="relative h-full flex flex-col items-stretch cursor-pointer bg-white border-r-4 border-black shadow-sm"
      animate={{
        flex: isActive ? '1' : '0 1 auto',
        width: isActive ? `calc(100vw - 2rem * 6)` : '2rem',
        background: isActive ? 'white' : '#aaa',
        zIndex: isActive ? 10 : 0,
      }}
      onClick={() => !isActive && setActive(win.id)}
    >
      {isActive && <WindowAddressBar win={win} />}
      {!isActive && (
        <div className="flex flex-col justify-center items-center h-full w-full select-none">
          <div className="rotate-90 whitespace-nowrap text-xs text-gray-500 font-medium max-w-md overflow-hidden text-ellipsis">
            {win.url ? win.url : 'No URL'}
          </div>
        </div>
      )}
      {isActive && <WindowIframe win={win} />}
      <WindowAction win={win} />
    </motion.div>
  )
}
