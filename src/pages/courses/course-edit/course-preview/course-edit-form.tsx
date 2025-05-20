import { RotateCcwIcon, SaveIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { dx } from '@/lib/dx'

import ImageUploader from '@/components/custom/image-uploader'
import { TagsInput } from '@/components/custom/tags-input'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { TParams } from '@/shared/mutations/useCourseEdit'

export default function CourseEditForm() {
  const form = useFormContext<TParams>()

  function onSubmit(values: TParams) {
    console.log(values)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grow shrink-0 rounded-lg w-full max-w-md flex h-full flex-col sticky top-0"
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
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Learn the fundamentals of visual communication."
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
          name="thumbnail_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <ImageUploader
                  value={field.value ? [field.value] : []}
                  onChange={(files) => {
                    field.onChange(files)
                  }}
                  multiple
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="grow"
            onClick={() => form.reset()}
          >
            <RotateCcwIcon />
            Reset
          </Button>
          <Button type="submit" className="grow">
            <SaveIcon /> Save
          </Button>
        </div>
      </div>
    </form>
  )
}
