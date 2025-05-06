import { useCommand } from '@/shared/stores/useCommand'
import { useEffect } from 'react'

export default function RegisterCommands() {
  const { cmd_register } = useCommand((s) => s.handlers)
  useEffect(() => {}, [])
  return null
}
