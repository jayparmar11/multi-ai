import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { useWindowActions, useWindows } from './store/windowsStore'

function App() {
  const windows = useWindows()
  const actions = useWindowActions()

  return (
    <div className="flex w-full h-screen bg-black overflow-hidden">
      {windows.map(win => (
        <motion.div
          key={win.id}
          layout
          id={win.id}
          transition={{ duration: 0.3 }}
          className="relative h-full flex flex-col items-stretch cursor-pointer bg-white border-r-4 border-black shadow-sm"
          animate={{
            flex: win.active ? '1' : '0 1 auto',
            width: win.active ? `calc(100vw - ${windows.length * 2}rem)` : '2rem',
            background: win.active ? 'white' : '#aaa',
            // zIndex: win.active ? 10 : 0,
          }}
          onClick={() => !win.active && actions.setActive(win.id)}
        >
          {/* Top URL input and search button for active window */}
          {win.active && (
            <form
              className="flex w-full border-b border-gray-200"
              onSubmit={(e) => {
                e.preventDefault()
                const url = (e.currentTarget.elements.namedItem('url') as HTMLInputElement)?.value
                actions.setUrl(win.id, url)
              }}
            >
              <input
                name="url"
                type="text"
                defaultValue={win.url}
                placeholder="Enter URL..."
                className="flex-1 outline-none text-sm h-8 px-2 bg-transparent"
                autoComplete="off"
                spellCheck={false}
              />
              <button type="submit" className="h-8 px-3 text-gray-600 hover:text-black">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </form>
          )}

          {/* Inactive window: show vertical URL label, hide iframe */}
          {!win.active && (
            <div className="flex flex-col justify-center items-center h-full w-full select-none">
              <div className="rotate-90 whitespace-nowrap text-xs text-gray-500 font-medium max-w-md overflow-hidden text-ellipsis">
                {win.url ? win.url : 'No URL'}
              </div>
            </div>
          )}

          {/* Iframe for active window only */}
          {win.active && (
            <div className="flex-1 w-full">
              {win.url
                ? (
                    <iframe
                      src={win.url}
                      title={win.id}
                      className="w-full h-full border-none"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  )
                : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-xs">Enter a URL above</div>
                  )}
            </div>
          )}

          {/* Action Buttons (absolute) */}
          {/* Add buttons only for active window */}
          {win.active && (
            <>
              {/* Add button bottom left */}
              <button
                className="absolute bottom-4 left-4 bg-white rounded-full shadow p-2 hover:bg-gray-100 transition"
                type="button"
                onClick={(e) => { e.stopPropagation(); actions.addWindow() }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </button>
              {/* Add button bottom right */}
              <button
                className="absolute bottom-4 right-4 bg-white rounded-full shadow p-2 hover:bg-gray-100 transition"
                type="button"
                onClick={(e) => { e.stopPropagation(); actions.addWindow() }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </button>
            </>
          )}
          {/* Remove button always visible */}
          <button
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full shadow p-2 hover:bg-red-100 text-red-500 transition ${win.active ? '' : 'opacity-80'}`}
            type="button"
            onClick={(e) => { e.stopPropagation(); actions.removeWindow(win.id) }}
          >
            <Trash2 />
          </button>
        </motion.div>
      ))}
    </div>
  )
}

export default App
