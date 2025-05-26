import { dx } from '@/lib/dx'

import { Button, TButtonProps } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface TTooptipButtonProps extends TButtonProps {
  helper: React.ReactNode
  delayDuration?: number
}

const TooltipButton = (props: TTooptipButtonProps) => {
  const { ref, helper, delayDuration = 200, ...rest } = props
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>
        <Button {...rest} ref={ref} />
      </TooltipTrigger>
      <TooltipContent>
        <span className={dx('label-01')}>{helper}</span>
      </TooltipContent>
    </Tooltip>
  )
}

export default TooltipButton
