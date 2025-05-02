import { useTranslation } from 'react-i18next'

// COMPONENTS
import { Separator } from '@/components/ui/separator'

// UTILS
import { dx } from '@/shared/design-system/typography'
import ProtectedRoutes from '@/routes/protected'
import AdminRoutes from '@/routes/admin'
import SideNavItem from './side-nav-item'
import OrderMenu from '@/components/custom/order-menu'
import { useUser } from '@/shared/queries/useUser'

export default function SideNav() {
  const { t } = useTranslation()
  const { data: user, isSuccess: userReady } = useUser()

  return (
    <nav className="flex w-full grow flex-col gap-2 px-px">
      <span
        className={dx(
          'label-01',
          'ml-2 line-clamp-1 font-semibold text-muted-foreground'
        )}
      >
        {t('glossary.analyses')}
      </span>
      <ul className="flex w-full flex-col">
        {ProtectedRoutes.map((r) => (
          <li key={r.path} className="group w-full">
            <SideNavItem
              label={t(r.label)}
              symbol={<r.icon size={15} />}
              path={r.path}
            />
          </li>
        ))}
        {userReady &&
          user.is_admin &&
          AdminRoutes.map((r) => (
            <li key={r.path} className="group w-full">
              <SideNavItem
                label={t(r.label)}
                symbol={<r.icon size={15} />}
                path={r.path}
              />
            </li>
          ))}
      </ul>

      <Separator />

      <OrderMenu />
    </nav>
  )
}
