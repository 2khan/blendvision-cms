import { zodResolver } from '@hookform/resolvers/zod'
import { UserPlus2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import PasswordInput from '@/components/custom/password-input'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
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
  EditUserSchema,
  type TParams,
  useEditUser
} from '@/shared/mutations/users/edit-user'
import type { TUser } from '@/shared/types/models/users'

interface TProps {
  user: TUser
}

export default function EditUserForm(props: TProps) {
  const { user } = props
  const { mutate, isPending } = useEditUser()
  const form = useForm<TParams>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      display_name: user.display_name || '',
      password: ''
    }
  })
  const onSubmit = (data: TParams) => {
    mutate(Object.assign({ user_id: user.id }, data), {
      onSuccess: (value) => {
        form.reset({
          display_name: value.display_name,
          password: ''
        })
      }
    })
  }

  return (
    <Form {...form}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Student Account</DialogTitle>
          <DialogDescription>
            Update student account details or change password.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                disabled={!form.formState.isDirty}
                isLoading={isPending}
              >
                <UserPlus2Icon /> Edit Student
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Form>
  )
}
