import { CheckCircledIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'

import Spinner from '@/components/custom/spinner'

export default function LoadingIndicator(props: { isLoading?: boolean }) {
  const { isLoading } = props
  return (
    <div
      className={cn(
        'bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-full',
        !isLoading && 'text-foreground'
      )}
    >
      {isLoading ? <Spinner /> : <CheckCircledIcon />}
    </div>
  )
}
