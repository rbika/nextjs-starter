'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { capitalize } from '@/utils/capitalize'

const ThemeSwitcher = ({
  variant = 'button',
}: {
  variant?: 'button' | 'dropdown-item'
}) => {
  const { theme, setTheme } = useTheme()

  const dropdownItems = (
    <>
      <DropdownMenuItem onClick={() => setTheme('light')}>
        Light
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('system')}>
        System
      </DropdownMenuItem>
    </>
  )

  if (variant === 'button') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          }
        />
        <DropdownMenuContent align="end">{dropdownItems}</DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (variant === 'dropdown-item') {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          Theme: {capitalize(theme)}
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>{dropdownItems}</DropdownMenuSubContent>
      </DropdownMenuSub>
    )
  }

  throw new Error(`Invalid variant: ${variant}`)
}

export { ThemeSwitcher }
