import { dx } from '@/lib/dx'

import BlurBackground from '@/components/custom/blur-background'
import ChangeTheme from '@/components/custom/change-theme'
import { GlowEffect } from '@/components/custom/glow-effect'
import Logo from '@/components/custom/logo'
import PasswordInput from '@/components/custom/password-input'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  return (
    <BlurBackground
      sides={['top-right', 'bottom-left']}
      className="flex h-full w-full grow flex-col justify-center items-center px-2 py-8"
      size={128}
    >
      <div className="relative flex h-max w-full max-w-lg flex-col items-center rounded-xl border bg-gradient-to-b from-background/90 to-background/80 text-card-foreground border-input shadow-xl shadow-primary/10">
        <GlowEffect className="-z-10" />
        <div className="flex w-full items-center justify-between border-b py-4 pl-6 pr-6">
          <Logo className="max-w-40" />
          <div className="flex gap-2">
            <ChangeTheme />
          </div>
        </div>

        <div className="w-full px-6 pt-4">
          <h1 className={dx('heading-compact-02', 'mb-1.5')}>
            Sign in to Blendvision CMS
          </h1>
          <p
            className={dx(
              'body-compact-02',
              'text-pretty text-muted-foreground'
            )}
          >
            Please sign in with your username and password to access your
            dashboard. We&apos;re glad to have you here—your personalized tools,
            insights, and updates are just a click away.
          </p>
        </div>

        <div className="w-full px-6 py-4">
          <div className="w-full space-y-1.5 mb-4">
            <Label>Username</Label>
            <Input />
          </div>
          <div className="w-full space-y-1.5">
            <Label>Password</Label>
            <PasswordInput />
          </div>
        </div>
        {/* {auth.exception && (
          <div
            className={dx(
              'label-02',
              'block w-full whitespace-pre text-pretty p-4 text-center text-destructive'
            )}
          >
            {t(`auth-exception.${auth.exception}`)}
          </div>
        )} */}
        <div className="w-full px-6 pt-4 pb-6">
          <Button
            // onClick={handleNavigate}
            isLoading={true}
            size="lg"
            className="w-full"
          >
            Login
          </Button>
        </div>
      </div>
    </BlurBackground>
  )
}
