import { Suspense, lazy } from 'react'

import { Grid2X2Icon, Rows3Icon } from 'lucide-react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { usePreference } from '@/shared/stores/usePreference'

const GridView = lazy(() => import('./grid.tab'))
const TableView = lazy(() => import('./table.tab'))

export default function CoursePage() {
  const list_view = usePreference((s) => s.course.list_view)
  const { course_set_list_view } = usePreference((s) => s.handlers)

  return (
    <Tabs
      className="flex flex-col gap-3 w-full h-full relative"
      value={list_view}
      onValueChange={course_set_list_view}
    >
      <TabsList>
        <TabsTrigger value="card">
          <Grid2X2Icon />
          Grid View
        </TabsTrigger>
        <TabsTrigger value="table">
          <Rows3Icon />
          Table View
        </TabsTrigger>
      </TabsList>
      <Suspense>
        <GridView />
      </Suspense>
      <Suspense>
        <TableView />
      </Suspense>
    </Tabs>
  )
}
