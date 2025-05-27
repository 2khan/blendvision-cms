import { useEffect } from 'react'

import { useUploadQueue } from '@/shared/stores/useUploadQueue'

export default function UploadList() {
  const upload_queue = useUploadQueue((s) => s.upload_queue)

  useEffect(() => {
    // console.log(upload_queue)
  }, [upload_queue])

  return null
}
