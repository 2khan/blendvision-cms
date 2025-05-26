import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { z } from 'zod'

import { dx } from '@/lib/dx'

import BlurBackground from '@/components/custom/blur-background'
import ChangeTheme from '@/components/custom/change-theme'
import { GlowEffect } from '@/components/custom/glow-effect'
import Logo from '@/components/custom/logo'
import PasswordInput from '@/components/custom/password-input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { signInUser } from '@/shared/auth/firebase'
import { useAuth } from '@/shared/contexts/useAuth'

const loginFormSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1)
})

type TLoginForm = z.infer<typeof loginFormSchema>

export default function LoginPage() {
  const [error, setError] = useState('')
  const { user, isLoading } = useAuth()

  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: TLoginForm) => {
    signInUser({ ...data, onError: setError })
  }

  if (user) return <Navigate to="/" replace />

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
            Please sign in with your email and password to access your
            dashboard. We&apos;re glad to have you here—your personalized tools,
            insights, and updates are just a click away.
          </p>
        </div>

        <Form {...form}>
          <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full px-6 py-4 space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && (
              <div
                className={dx(
                  'label-02',
                  'block w-full whitespace-pre text-pretty px-6 text-destructive'
                )}
              >
                {error}
              </div>
            )}
            <div className="w-full px-6 pt-4 pb-6">
              <Button
                type="submit"
                disabled={!form.formState.isDirty}
                isLoading={isLoading}
                size="lg"
                className="w-full"
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </BlurBackground>
  )
}
