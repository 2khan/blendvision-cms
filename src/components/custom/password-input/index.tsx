import { useState } from 'react'

import { Eye, EyeOff } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TProps extends React.ComponentProps<'input'> {
  initialState?: {
    showPassword?: boolean
  }
}

export default function PasswordInput({
  className,
  initialState,
  ...props
}: TProps) {
  const [showPassword, setShowPassword] = useState<boolean>(
    Boolean(initialState?.showPassword)
  )

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter your password"
        className={cn('pr-10', className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  )
}
