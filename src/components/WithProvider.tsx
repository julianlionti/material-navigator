import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { Translations } from '../translate'
import { esAR } from '../translate/es_AR'
import {
  MenuProps,
  NavigatorProvider,
  RouteProps
} from '../utils/NavigatorContext'
import Navigator from './Navigator'

interface Props {
  title: string
  menu: MenuProps[]
  routes: RouteProps[]
  lang?: Translations
}

export default (props: Props) => {
  const { menu, routes, title, lang } = props
  return (
    <React.Fragment>
      <CssBaseline />
      <NavigatorProvider menu={menu} routes={routes} lang={lang || esAR}>
        <Navigator title={title} />
      </NavigatorProvider>
    </React.Fragment>
  )
}
