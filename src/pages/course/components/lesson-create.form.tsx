import { zodResolver } from '@hookform/resolvers/zod'
import { RotateCcwIcon, SaveIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Kbd, KbdKey } from '@/components/custom/kbd'
import TooltipButton from '@/components/custom/tooltip-button'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'

import {
  CreateLessonSchema,
  type TParams,
  useCreateLesson
} from '@/shared/mutations/lesson/lesson-create'
import type { TCourse } from '@/shared/types/models/course'

interface TProps {
  course_id: TCourse['id']
  onSuccess?: (values: TParams) => void
}

export default function LessonCreateForm(props: TProps) {
  const { course_id, onSuccess } = props
  const { mutate, isPending } = useCreateLesson()
  const form = useForm<TParams>({
    resolver: zodResolver(CreateLessonSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  })

  function onSubmit(values: TParams) {
    mutate(
      Object.assign(values, {
        course_id
      }),
      {
        onSuccess: () => {
          form.reset()

          if (onSuccess) {
            onSuccess(values)
          }
        }
      }
    )
  }

  return (
    <SheetContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grow shrink-0 rounded-lg w-full max-w-sm flex h-full flex-col sticky top-0"
        >
          <SheetHeader>
            <SheetTitle>Create Course</SheetTitle>
            <SheetDescription>
              Use the form below to create a new lesson by providing the title,
              description, and other relevant details. You can always preview or
              edit the lesson after.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Getting Started" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a brief summary of what this lesson covers."
                      {...field}
                      onChange={(e) => {
                        field.onChange(
                          e.target.value.replace(/\n{3,}/g, '\n\n')
                        )
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    You can press{' '}
                    <Kbd variant="outline" size="sm">
                      <KbdKey>Enter</KbdKey>
                    </Kbd>{' '}
                    to insert a new line — up to{' '}
                    <span className="font-semibold">
                      2 consecutive line breaks
                    </span>{' '}
                    are allowed.
                  </FormDescription>
                </FormItem>
              )}
            />

            <SheetFooter>
              <TooltipButton
                helper="Reset"
                size="icon"
                variant="outline"
                onClick={() => form.reset()}
              >
                <RotateCcwIcon />
              </TooltipButton>
              <Button
                type="submit"
                className="grow"
                disabled={!form.formState.isDirty}
                isLoading={isPending}
              >
                <SaveIcon /> Create Lesson
              </Button>
            </SheetFooter>
          </div>
        </form>
      </Form>
    </SheetContent>
  )
}
