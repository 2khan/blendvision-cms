import { RotateCcwIcon, SaveIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { dx } from '@/lib/dx'

import FileUploader from '@/components/custom/file-uploader'
import { Kbd, KbdKey } from '@/components/custom/kbd'
import { TagsInput } from '@/components/custom/tags-input'
import TooltipButton from '@/components/custom/tooltip-button'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import {
  type TParams,
  useEditCourse
} from '@/shared/mutations/course/course-edit'
import type { TCourse } from '@/shared/types/models/course'

interface TProps {
  course_id: TCourse['id']
}

export default function CourseEditForm(props: TProps) {
  const { course_id } = props
  const form = useFormContext<TParams>()
  const { mutate, isPending } = useEditCourse()

  function onSubmit(values: TParams) {
    const normalizedData = Object.fromEntries(
      Object.keys(form.formState.dirtyFields).map((key) => [
        key,
        values[key as keyof TParams]
      ])
    )

    mutate(
      Object.assign(normalizedData, {
        course_id
      })
    )
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grow shrink-0 rounded-lg w-full max-w-sm flex h-full flex-col sticky top-0"
    >
      <span className={dx('heading-compact-02', 'mb-1')}>
        Edit Course Details
      </span>
      <span className={dx('body-compact-02', 'text-muted-foreground mb-5')}>
        Use the form below to update the course information, including the
        title, description, instructor, schedule, and any other relevant
        details. You can preview the changes live in the view before saving them
        to ensure everything looks correct.
      </span>

      <div className="flex flex-col gap-3">
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
                    field.onChange(e.target.value.replace(/\n{3,}/g, '\n\n'))
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
                <span className="font-semibold">2 consecutive line breaks</span>{' '}
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
                <TagsInput
                  value={field.value || []}
                  onChange={field.onChange}
                />
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
                    value={field.value || []}
                    onChange={field.onChange}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex gap-3">
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
            <SaveIcon /> Save
          </Button>
        </div>
      </div>
    </form>
  )
}
