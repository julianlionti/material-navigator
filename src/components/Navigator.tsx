import React, { memo, Suspense } from 'react'
import { Backdrop, CircularProgress, CssBaseline, makeStyles } from '@material-ui/core'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import {
  IconsProps,
  MenuProps,
  RouteProps,
  useNavigator,
  useNavigatorConfig,
  UserMenuProps
} from '../utils/NavigatorContext'
import DrawerMenu from './DrawerMenu'
import DrawerRight from './DrawerRight'
import Header from './Header'

export const createMenu = (props: MenuProps[]) => props
export const createUserMenu = (props: UserMenuProps[]) => props
export const createRoutes = (props: RouteProps[]) => props
export const createExtraIcons = (props: IconsProps[]) => props

export default memo(() => {
  const {
    routes,
    drawer,
    menuDrawerWidth,
    loading,
    blockUi,
    loginPath,
    maintainIcons
  } = useNavigator()
  const { noPadding } = useNavigatorConfig()
  const classes = useClasses({ drawerWidth: menuDrawerWidth, noPadding, loading, maintainIcons })

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <DrawerMenu />
        <DrawerRight />
        <main className={`${classes.content} ${drawer ? classes.contentShift : ''}`}>
          <Suspense fallback={<CircularProgress />}>
            <div className={classes.drawerHeader} />
            <Switch>
              {routes.map(({ component, route, exact, hidden }) => {
                return (
                  <Route
                    key={route}
                    path={route}
                    exact={exact || route === '/'}
                    render={({ location }) =>
                      hidden ? (
                        <Redirect
                          to={{
                            pathname: loginPath || '/login',
                            state: { from: location }
                          }}
                        />
                      ) : (
                        component
                      )
                    }
                  />
                )
              })}
            </Switch>
          </Suspense>
        </main>
      </div>
      {blockUi === 'bottomRight' ? (
        <div className={classes.bottomRight}>
          <CircularProgress color='inherit' />
        </div>
      ) : (
        <Backdrop className={classes.backdrop} open={!!loading}>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
    </BrowserRouter>
  )
})

const useClasses = makeStyles((theme) => ({
  root: {
    flex: 1
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: ({ noPadding, maintainIcons }: any) => ({
    flexGrow: 1,
    padding: theme.spacing(noPadding ? 0 : 2),
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: maintainIcons ? theme.spacing(7) + 1 : 0
    }
  }),
  contentShift: ({ drawerWidth }: any) => ({
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: drawerWidth
    }
  }),
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  bottomRight: ({ loading }: any) => ({
    display: !loading ? 'none' : 'flex',
    bottom: 0,
    right: 0,
    position: 'fixed',
    margin: 32
  })
}))
