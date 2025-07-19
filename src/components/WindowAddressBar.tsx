import type { WindowProps } from './types'
import { useWindowActions } from '../store/windowsStore'
import { Input } from './ui/input'

function WindowAddressBar({ win }: WindowProps) {
  const { setUrl } = useWindowActions()
  return (
    <form
      className="flex w-full"
      onSubmit={(e) => {
        e.preventDefault()
        const url = (e.currentTarget.elements.namedItem('url') as HTMLInputElement)?.value
        setUrl(win.id, url)
      }}
    >
      <Input
        name="url"
        type="text"
        defaultValue={win.url}
        placeholder="Enter URL..."
        className="flex-1"
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
  )
}

export default WindowAddressBar
