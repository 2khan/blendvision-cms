import { zodResolver } from '@hookform/resolvers/zod'
import { RotateCcwIcon, UserPlus2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import PasswordInput from '@/components/custom/password-input'
import TooltipButton from '@/components/custom/tooltip-button'
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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'

import {
  CreateUserSchema,
  type TParams,
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
    mutate(data)
  }

  return (
    <SheetContent>
      <Form {...form}>
        <form
          className="grow shrink-0 rounded-lg w-full max-w-sm flex h-full flex-col sticky top-0"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <SheetHeader>
            <SheetTitle>Create Student Account</SheetTitle>
            <SheetDescription>
              Set up a student account to give access to courses on the
              platform.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-3">
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
          <SheetFooter>
            <TooltipButton
              helper="Reset"
              size="icon"
              variant="outline"
              onClick={() => form.reset()}
            >
              <RotateCcwIcon />
            </TooltipButton>
            <SheetClose asChild>
              <Button
                type="submit"
                className="grow"
                disabled={!form.formState.isDirty || isPending}
              >
                <UserPlus2Icon /> Create Student
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  )
}
