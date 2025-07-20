import type { WindowProps } from './types'
import { Search } from 'lucide-react'
import { useWindowActions } from '../store/windowsStore'
import { Button } from './ui/button'
import { Input } from './ui/input'

function WindowAddressBar({ win }: WindowProps) {
  const { setUrl } = useWindowActions()
  return (
    <form
      className="flex w-full relative p-1 text-slate-400"
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
        className=" border-0 bg-slate-900 font-semibold"
        autoComplete="off"
        spellCheck={false}
      />
      <Button type="submit" variant="ghost" size="icon" className="absolute hover:bg-slate-500/30 hover:text-inherit right-1 top-1/2 -translate-y-1/2">
        <Search className="size-5" />
      </Button>
    </form>
  )
}

export default WindowAddressBar
