import React, { memo, Suspense, useCallback } from 'react'
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

export const createRoutes = <T extends string = string>(props: RouteProps<T>[]) => props
export const createMenu = <T extends string = string>(props: MenuProps<T>[]) => props
export const createUserMenu = (props: UserMenuProps[]) => props
export const createExtraIcons = (props: IconsProps[]) => props

export default memo(() => {
  const {
    routes,
    drawer,
    menuDrawerWidth,
    loading,
    blockUi,
    loginPath,
    maintainIcons,
    multipleRoutesComponent
  } = useNavigator()
  const { noPadding, onlyContent, noDrawerMenu } = useNavigatorConfig()
  const classes = useClasses({
    drawerWidth: menuDrawerWidth,
    noPadding,
    loading,
    maintainIcons,
    onlyContent
  })

  const renderMenus = useCallback(() => {
    if (onlyContent) return null

    return (
      <React.Fragment>
        <Header />
        {!noDrawerMenu && <DrawerMenu />}
        <DrawerRight />
      </React.Fragment>
    )
  }, [noDrawerMenu, onlyContent])

  const renderLoading = useCallback(() => {
    if (!loading) return null
    if (blockUi === 'bottomRight')
      return (
        <div className={classes.bottomRight}>
          <CircularProgress color='inherit' />
        </div>
      )
    else
      return (
        <Backdrop className={classes.backdrop} open={!!loading}>
          <CircularProgress color='inherit' />
        </Backdrop>
      )
  }, [blockUi, classes.backdrop, classes.bottomRight, loading])

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        {renderMenus()}
        <main
          className={`${onlyContent ? '' : classes.content} ${
            drawer && !onlyContent ? classes.contentShift : ''
          }`}
        >
          <Suspense fallback={<CircularProgress />}>
            {!onlyContent && <div className={classes.drawerHeader} />}
            <Switch>
              {routes.map(({ component, route, exact, hidden }) => {
                return (
                  <Route
                    key={route}
                    path={route}
                    exact={exact || route === '/'}
                    render={({ location, history }) =>
                      hidden ? (
                        <Redirect
                          to={{
                            pathname: loginPath || '/login',
                            state: { from: location }
                          }}
                        />
                      ) : (
                        <React.Fragment>
                          {component}
                          {multipleRoutesComponent && multipleRoutesComponent(history)}
                        </React.Fragment>
                      )
                    }
                  />
                )
              })}
            </Switch>
          </Suspense>
        </main>
      </div>
      {renderLoading()}
    </BrowserRouter>
  )
})

const useClasses = makeStyles((theme) => ({
  root: {
    flex: 1
  },
  drawerHeader: ({ onlyContent }: any) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, onlyContent ? 0 : 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  }),
  content: ({ noPadding, maintainIcons, onlyContent }: any) => ({
    flexGrow: 1,
    padding: theme.spacing(noPadding || onlyContent ? 0 : 2),
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: onlyContent ? 0 : maintainIcons ? theme.spacing(7) + 1 : 0
      // marginLeft: maintainIcons && !onlyContent?  theme.spacing(7) + 1 : 0
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
    zIndex: 9999,
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
