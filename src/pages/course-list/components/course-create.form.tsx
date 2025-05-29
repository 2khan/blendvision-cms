import { zodResolver } from '@hookform/resolvers/zod'
import { RotateCcwIcon, SaveIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import FileUploader from '@/components/custom/file-uploader'
import { Kbd, KbdKey } from '@/components/custom/kbd'
import { TagsInput } from '@/components/custom/tags-input'
import TooltipButton from '@/components/custom/tooltip-button'
import { Badge } from '@/components/ui/badge'
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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'

import {
  CreateCourseSchema,
  type TParams,
  useCreateCourse
} from '@/shared/mutations/course/course-create'

export default function CourseCreateForm() {
  const { mutate, isPending } = useCreateCourse()
  const form = useForm<TParams>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: []
    }
  })

  function onSubmit(values: TParams) {
    mutate(values, {
      onSuccess: () => {
        form.reset()
      }
    })
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
              Use the form below to create a new course by providing the title,
              description, and other relevant details. You can always preview or
              edit the course after.
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
                    <Input
                      placeholder="e.g. Introduction to Graphic Design"
                      {...field}
                    />
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
                      placeholder="e.g. Learn the fundamentals of visual communication."
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

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagsInput value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thumbnails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <div className="flex flex-col gap-3">
                      <FileUploader
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  </FormControl>
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
              <SheetClose asChild>
                <Button
                  type="submit"
                  className="grow"
                  disabled={!form.formState.isDirty}
                  isLoading={isPending}
                >
                  <SaveIcon /> Create Course
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </form>
      </Form>
    </SheetContent>
  )
}
