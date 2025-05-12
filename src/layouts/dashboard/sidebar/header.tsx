import { Link } from 'react-router-dom'

import BlurBackground from '@/components/custom/blur-background'
import Logo from '@/components/custom/logo'

import { HEADER_HEIGHT } from '@/shared/constants/layout'

export default function SidebarHeader() {
  return (
    <Link to="/" className="shrink-0">
      <BlurBackground
        sides={['top-right', 'bottom-left']}
        className="bg-card shadow-glow rounded-2xl"
      >
        <div
          className="border-input flex grow flex-col items-center justify-center rounded-2xl border px-6 py-2"
          style={{ height: HEADER_HEIGHT }}
        >
          <Logo />
        </div>
      </BlurBackground>
    </Link>
  )
}
