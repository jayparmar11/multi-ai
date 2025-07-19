import { AnimatePresence } from 'motion/react'
import { useWindows } from '../store/windowsStore'
import Window from './Window'

export default function MultiWindow() {
  const windows = useWindows()
  return (
    <div className="flex  w-full h-screen bg-black overflow-hidden">
      <AnimatePresence>
        {windows.map(win => (
          <Window key={win.id} win={win} />
        ))}
      </AnimatePresence>
    </div>
  )
}
