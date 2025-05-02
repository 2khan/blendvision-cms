import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { type Theme, themes, useTheme } from '@/shared/contexts/useTheme'
import { dx } from '@/lib/dx'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

export default function ChangeTheme() {
  const { theme: selected, setTheme } = useTheme()

  const handleClick = (theme: Theme) => () => {
    setTheme(theme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="relative">
          <SunIcon className="absolute scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
          <MoonIcon className="absolute scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Change Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.key}
            onClick={handleClick(theme.key)}
            className="flex gap-2"
            disabled={selected === theme.key}
          >
            <theme.icon />
            <span className={dx('label-02', 'capitalize')}>{theme.key}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
