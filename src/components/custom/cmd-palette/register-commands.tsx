import { useEffect, useMemo } from 'react'

import { UploadIcon, UserPlus2Icon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { useCommand } from '@/shared/stores/useCommand'

export default function RegisterCommands() {
  const navigate = useNavigate()
  const { cmd_register, cmd_unregister } = useCommand((s) => s.handlers)

  const commands = useMemo(() => {
    return [
      {
        id: 'upload-course',
        hotkey: 'u',
        icon: UploadIcon,
        label: 'Upload Course',
        action: () => {
          navigate('/courses')
        }
      },
      {
        id: 'create-user',
        hotkey: 'i',
        icon: UserPlus2Icon,
        label: 'Create User',
        action: () => {
          navigate('/users')
        }
      }
    ]
  }, [navigate])

  useEffect(() => {
    commands.forEach((cmd) => cmd_register(cmd))

    return () => {
      commands.forEach((cmd) => cmd_unregister(cmd.id))
    }
  }, [commands, cmd_register, cmd_unregister])
  return null
}
