import { dx } from '@/lib/dx'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CourseEditForm() {
  return (
    <div className="grow shrink-0 rounded-lg p-2 w-full max-w-md flex h-full flex-col sticky top-0">
      <span className={dx('heading-compact-02', 'mb-1')}>
        Edit Course Details
      </span>
      <span className={dx('body-compact-02', 'text-muted-foreground mb-5')}>
        Use the form below to update the course information, including the
        title, description, instructor, schedule, and any other relevant
        details. You can preview the changes live in the view before saving them
        to ensure everything looks correct.
      </span>
      <div>
        <Label>Hello</Label>
        <Input />
      </div>
      <div>
        <Button>Confirm</Button>
      </div>
    </div>
  )
}
