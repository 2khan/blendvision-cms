import { zodResolver } from '@hookform/resolvers/zod'
import { RotateCcwIcon, UserPlus2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { dx } from '@/lib/dx'

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

import {
  CreateUserSchema,
  TParams,
  useCreateUser
} from '@/shared/mutations/users/create-user'

export default function CreateUserForm() {
  const { mutate, isPending } = useCreateUser()
  const form = useForm<TParams>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      display_name: '',
      email: '',
      password: '',
      password_confirm: ''
    }
  })
  const onSubmit = (data: TParams) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Student successfully created!')
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grow shrink-0 rounded-lg w-full max-w-md flex h-full flex-col sticky top-0"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <span className={dx('heading-compact-02', 'mb-1')}>
          Create Student Account
        </span>
        <span className={dx('body-compact-02', 'text-muted-foreground mb-5')}>
          Set up a student account to give access to courses on the platform.
        </span>

        <div className="flex flex-col gap-3 mb-5">
          <FormField
            control={form.control}
            name="display_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Name</FormLabel>
                <FormControl>
                  <Input placeholder="Student Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
                  <PasswordInput
                    initialState={{ showPassword: false }}
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password_confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    initialState={{ showPassword: false }}
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="grow"
            onClick={() => form.reset()}
          >
            <RotateCcwIcon />
            Reset
          </Button>
          <Button
            type="submit"
            className="grow"
            disabled={!form.formState.isDirty || isPending}
          >
            <UserPlus2Icon /> Create Student
          </Button>
        </div>
      </form>
    </Form>
  )
}
