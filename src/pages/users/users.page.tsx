import { Suspense, lazy } from 'react'

import type { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/custom/data-table'

import { useUsers } from '@/shared/queries/users/user-list'
import { usePreference } from '@/shared/stores/usePreference'
import { TUser } from '@/shared/types/models/users'

import ActionMenu from './components/action-menu'

const CreateUserTrigger = lazy(() => import('./components/create-user-trigger'))

const columns: ColumnDef<TUser>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      label: 'ID'
    }
  },
  {
    accessorKey: 'uid',
    header: 'UID',
    meta: {
      label: 'UID'
    }
  },
  {
    accessorKey: 'display_name',
    header: 'Name',
    meta: {
      label: 'Name'
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'email',
    header: 'Email',
    meta: {
      label: 'Email'
    },
    enableColumnFilter: true
  },
  {
    id: 'actions',
    header: 'Actions',
    meta: { label: 'Actions', align: 'center' },
    cell: ({ row }) => {
      return <ActionMenu user={row.original} />
    }
  }
]

export default function UserManagementPage() {
  const { data: users } = useUsers()
  const page_size = usePreference((s) => s.users.default_page_size)
  const set_page_size = usePreference(
    (s) => s.handlers.users_set_table_page_size
  )
  return (
    <DataTable
      columns={columns}
      data={users || []}
      meta={{
        onPageSizeChange: set_page_size
      }}
      options={{
        initialState: {
          columnVisibility: Object.fromEntries(
            ['id', 'uid'].map((k) => [k, false])
          ),
          pagination: {
            pageSize: page_size
          }
        }
      }}
      toolbar_actions={
        <Suspense>
          <CreateUserTrigger />
        </Suspense>
      }
    />
  )
}
