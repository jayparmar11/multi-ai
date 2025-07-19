import type { WindowProps } from './types'
import { INACTIVE_WINDOW_SIZE } from '@/constants'
import { useWindows } from '@/store/windowsStore'

function WindowIframe({ win }: WindowProps) {
  const windows = useWindows()
  return (
    <div className="h-full w-full relative">
      {win.url
        ? (
            <div className="absolute inset-0 overflow-hidden">
              <iframe
                src={win.url}
                title={win.id}
                className="h-full border-none overflow-hidden rounded-lg"
                style={{
                  width: `calc(100vw - ${INACTIVE_WINDOW_SIZE} * ${windows.length - 1})`,
                }}
                // eslint-disable-next-line react-dom/no-unsafe-iframe-sandbox
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          )
        : (
            <div className="flex items-center justify-center h-full text-gray-400 text-xs">Enter a URL above</div>
          )}
    </div>
  )
}

export default WindowIframe
