import type { WindowProps } from './types'

function WindowIframe({ win }: WindowProps) {
  return (
    <div className="flex-1 w-full">
      {win.url
        ? (
            <iframe
              src={win.url}
              title={win.id}
              className="w-full h-full border-none"
              // eslint-disable-next-line react-dom/no-unsafe-iframe-sandbox
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          )
        : (
            <div className="flex items-center justify-center h-full text-gray-400 text-xs">Enter a URL above</div>
          )}
    </div>
  )
}

export default WindowIframe
