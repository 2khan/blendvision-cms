import type { TMeta } from '@/shared/types/utils/meta'
import { PageRoutes } from '@/routes'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

type MetaProviderProps = {
  children: React.ReactNode
}

type MetaProviderState = {
  meta: TMeta
  setMeta: React.Dispatch<React.SetStateAction<TMeta>>
}

const initialState: MetaProviderState = {
  meta: { title: import.meta.env.VITE_APP_TITLE },
  setMeta: () => null
}

const MetaProviderContext = createContext<MetaProviderState>(initialState)

export function MetaProvider({ children }: MetaProviderProps) {
  const { pathname } = useLocation()
  const [meta, setMeta] = useState<TMeta>(initialState.meta)

  const route = useMemo(
    () => PageRoutes.find((r) => r.path === pathname),
    [pathname]
  )

  console.log(route, pathname)

  useEffect(() => {
    if (!route?.meta.title) {
      setMeta(initialState.meta)
      return
    }

    setMeta(route.meta)
  }, [route])

  const value = {
    meta,
    setMeta
  }

  return (
    <MetaProviderContext.Provider value={value}>
      <title>{meta.title}</title>
      <meta name="title" content={meta.title} />
      <meta name="description" content={meta.description} />
      {children}
    </MetaProviderContext.Provider>
  )
}

export const useMeta = () => {
  const context = useContext(MetaProviderContext)

  if (context === undefined)
    throw new Error('useMeta must be used within a MetaProvider')

  return context
}
