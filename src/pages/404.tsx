import BlurBackground from '@/components/custom/blur-background'
import Logo from '@/components/custom/logo'
import { Button } from '@/components/ui/button'
import {
  CONTENT_PADDING,
  HEADER_HEIGHT,
  SIDE_OPEN_W
} from '@/shared/constants/layout'
import { dx } from '@/lib/dx'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <BlurBackground
      sides={['top-right', 'bottom-left']}
      className="flex h-full w-full grow flex-col p-2"
      size={128}
    >
      <Link to="/" className="shrink-0">
        <div
          className="border-input bg-background text-primary dark:text-foreground flex flex-col items-center rounded-2xl border py-2 shadow-sm"
          style={{
            height: HEADER_HEIGHT,
            width: SIDE_OPEN_W - CONTENT_PADDING
          }}
        >
          <Logo />
        </div>
      </Link>
      <div className="flex grow flex-col items-center justify-center gap-4">
        <span className={dx('fluid-paragraph-01', 'text-muted-foreground')}>
          Page not found
        </span>
        <div className="from-gradient-1 via-gradient-2 to-gradient-3 bg-gradient-to-r bg-clip-text dark:brightness-150">
          <span className={dx('fluid-display-04', 'text-transparent')}>
            404
          </span>
        </div>
        <Button asChild variant="link">
          <Link to="/">Go to home</Link>
        </Button>
      </div>
    </BlurBackground>
  )
}
