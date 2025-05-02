import { NAV_ITEM_HEIGHT } from '@/shared/constants/layout'
import { dx } from '@/lib/dx'
import { NavLink } from 'react-router-dom'

type TProps = {
  path: string
  label: string
  symbol?: React.ReactNode
}

export default function SideNavItem(props: TProps) {
  const { label, path, symbol } = props
  return (
    <NavLink
      end
      to={path}
      className={({ isActive }) =>
        dx(
          'body-compact-01',
          'text-muted-foreground group-hover:text-primary flex w-full items-center gap-2 p-2',
          isActive &&
            'bg-background text-foreground rounded-md font-medium shadow'
        )
      }
      style={{ height: NAV_ITEM_HEIGHT }}
    >
      {symbol && <div className="w-5 shrink-0">{symbol}</div>}
      <div className="line-clamp-1">{label}</div>
    </NavLink>
  )
}
