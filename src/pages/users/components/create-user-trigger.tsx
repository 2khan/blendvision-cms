import { UserPlus2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'

import CreateUserForm from './create-user.form'

interface TProps {
  className?: string
  children?: React.ReactNode
}

export default function CreateUserTrigger(props: TProps) {
  const { className, children } = props
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children ?? (
          <Button size="sm" variant="outline" className={className}>
            <UserPlus2Icon />
            Create Student
          </Button>
        )}
      </SheetTrigger>
      <CreateUserForm />
    </Sheet>
  )
}
