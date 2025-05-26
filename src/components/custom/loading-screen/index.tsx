import BlurBackground from '@/components/custom/blur-background'

import Spinner from '../spinner'

export default function LoginPage() {
  return (
    <BlurBackground
      sides={['top-right', 'bottom-left']}
      className="flex h-full w-full grow flex-col justify-center items-center px-2 py-8"
      size={128}
    >
      <Spinner />
    </BlurBackground>
  )
}
