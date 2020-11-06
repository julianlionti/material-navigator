import { createMenu, createRoutes, createUserMenu, createExtraIcons } from './components/Navigator'
import Navigator from './components/WithProvider'
import { useNavigator, useTitle } from './utils/NavigatorContext'

export type { IconsProps } from '../src/utils/NavigatorContext'
export {
  Navigator,
  createMenu,
  createRoutes,
  createUserMenu,
  useNavigator,
  useTitle,
  createExtraIcons
}
