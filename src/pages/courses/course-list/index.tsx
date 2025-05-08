import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { usePreference } from '@/shared/stores/usePreference'
import { Grid2X2Icon, Rows3Icon } from 'lucide-react'
import GridView from './grid-view'
import TableView from './table-view'

export default function CoursePage() {
  const list_view = usePreference((s) => s.course.list_view)
  const { course_set_list_view } = usePreference((s) => s.handlers)
  return (
    <Tabs
      className="flex flex-col gap-3"
      value={list_view}
      onValueChange={course_set_list_view}
    >
      <TabsList>
        <TabsTrigger value="card">
          <Grid2X2Icon />
        </TabsTrigger>
        <TabsTrigger value="table">
          <Rows3Icon />
        </TabsTrigger>
      </TabsList>
      <GridView />
      <TableView />
    </Tabs>
  )
}
