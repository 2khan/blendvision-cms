// UTILS
import { dx } from '@/lib/dx'

import { menuRoutes } from '@/routes/utils.routes'

import SideNavItem from './side-nav-item'

export default function SideNav() {
  return (
    <nav className="flex w-full grow flex-col gap-2 px-px">
      <span
        className={dx(
          'label-01',
          'text-muted-foreground ml-2 line-clamp-1 font-semibold'
        )}
      >
        Menu
      </span>
      <ul className="flex w-full flex-col">
        {menuRoutes.map((r) => (
          <li key={r.path} className="group w-full">
            <SideNavItem meta={r.meta} symbol={<r.icon />} path={r.path} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
