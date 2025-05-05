import { create } from 'zustand'
import { TMeta } from '@/shared/types/utils/meta'
import { Fragment } from 'react/jsx-runtime'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { getRouteMeta } from '@/routes/utils'

type MetaStore = {
  meta: TMeta
  setMeta: (meta: TMeta) => void
  reset: () => void
}

const IMeta: TMeta = {
  title: import.meta.env.VITE_APP_TITLE
}

export const useMeta = create<MetaStore>((set) => ({
  meta: IMeta,
  setMeta: (meta) => set({ meta }),
  reset: () => set({ meta: IMeta })
}))

export function Meta() {
  const { pathname } = useLocation()
  const { meta, setMeta, reset } = useMeta()

  useEffect(() => {
    const meta = getRouteMeta(pathname)

    if (!meta) {
      reset()
      return
    }
    setMeta(meta)
  }, [pathname, setMeta, reset])

  return (
    <Fragment>
      <title>{meta.title}</title>
      <meta name="title" content={meta.title} />
      <meta name="description" content={meta.description} />
    </Fragment>
  )
}
