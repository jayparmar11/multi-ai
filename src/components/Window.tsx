import type { WindowProps } from './types'
import { motion } from 'framer-motion'
import { useWindowActions } from '../store/windowsStore'
import WindowAction from './WindowAction'
import WindowAddressBar from './WindowAddressBar'
import WindowIframe from './WindowIframe'

export default function Window({ win }: WindowProps) {
  const { setActive } = useWindowActions()
  return (
    <motion.div
      layout
      id={win.id}
      transition={{ duration: 0.3 }}
      className="relative h-full flex flex-col items-stretch cursor-pointer bg-white border-r-4 border-black shadow-sm"
      animate={{
        flex: win.active ? '1' : '0 1 auto',
        width: win.active ? `calc(100vw - 2rem * 6)` : '2rem',
        background: win.active ? 'white' : '#aaa',
        zIndex: win.active ? 10 : 0,
      }}
      onClick={() => !win.active && setActive(win.id)}
    >
      {win.active && <WindowAddressBar win={win} />}
      {!win.active && (
        <div className="flex flex-col justify-center items-center h-full w-full select-none">
          <div className="rotate-90 whitespace-nowrap text-xs text-gray-500 font-medium max-w-md overflow-hidden text-ellipsis">
            {win.url ? win.url : 'No URL'}
          </div>
        </div>
      )}
      {win.active && <WindowIframe win={win} />}
      <WindowAction win={win} />
    </motion.div>
  )
}
