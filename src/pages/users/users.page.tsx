import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/custom/data-table'

import { useUsers } from '@/shared/queries/users/user-list'
import { usePreference } from '@/shared/stores/usePreference'
import { TUser } from '@/shared/types/models/users'

import CreateUserForm from './create-user.form'

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
    }
  },
  {
    accessorKey: 'email',
    header: 'Email',
    meta: {
      label: 'Email'
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
    <div className="flex gap-6 items-start">
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
      />
      <CreateUserForm />
    </div>
  )
}
