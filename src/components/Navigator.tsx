import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { MenuProps, RouteProps, useNavigator } from '../utils/NavigatorContext'
import Header from './Header'

interface Props {
  title: string
}

export const createMenu = (props: MenuProps[]) => props
export const createRoutes = (props: RouteProps[]) => props

export default (props: Props) => {
  const { title } = props
  console.log(title)
  const { routes } = useNavigator()

  const classes = useClasses()
  return (
    <BrowserRouter>
      <Header />
      <div className={classes.root}>
        <Switch>
          {routes.map(({ component, route }) => (
            <Route key={route} path={route} exact={route === '/'}>
              {component}
            </Route>
          ))}
        </Switch>
      </div>
    </BrowserRouter>
  )
}

const useClasses = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1)
  }
}))
