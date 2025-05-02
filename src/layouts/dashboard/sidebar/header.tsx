import BlurBackground from '@/components/custom/blur-background'
import Logo from '@/components/custom/logo'
import { HEADER_HEIGHT } from '@/shared/constants/layout'
import { Link } from 'react-router-dom'

export default function SidebarHeader() {
  return (
    <Link to="/" className="shrink-0">
      <BlurBackground
        sides={['top-right', 'bottom-left']}
        className="rounded-2xl bg-card shadow-glow"
      >
        <div
          className="flex grow flex-col items-center rounded-2xl border border-input py-2"
          style={{ height: HEADER_HEIGHT }}
        >
          <Logo />
        </div>
      </BlurBackground>
    </Link>
  )
}
