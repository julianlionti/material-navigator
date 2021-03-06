import { createMenu, createRoutes, createUserMenu, createExtraIcons } from './components/Navigator'
import Navigator from './components/WithProvider'
import { useNavigator, useNavigatorConfig } from './utils/NavigatorContext'

export type { IconsProps } from '../src/utils/NavigatorContext'
export type { RouteProps } from '../src/utils/NavigatorContext'
export type { MenuProps } from '../src/utils/NavigatorContext'
export type { UserMenuProps } from '../src/utils/NavigatorContext'
export {
  Navigator,
  createMenu,
  createRoutes,
  createUserMenu,
  useNavigator,
  useNavigatorConfig,
  createExtraIcons
}
