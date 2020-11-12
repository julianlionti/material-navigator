import React, { lazy, useEffect, useState } from 'react'
import { FaBeer, FaHome, FaInfo, FaStar, FaUser } from 'react-icons/fa'
import {
  Navigator,
  createMenu,
  createUserMenu,
  createRoutes,
  createExtraIcons
} from 'material-navigator'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'

const Home = lazy(() => import('./screens/Home'))
const AboutUS = lazy(() => import('./screens/About'))

const User = () => {
  return <p>User</p>
}

const App = () => {
  const [menu, setMenu] = useState(
    createMenu([
      { route: '/', title: 'Home', description: 'Home screen', icon: <FaHome size={24} /> },
      {
        route: '/about',
        title: 'About US',
        description: 'Information about Material Navigator',
        icon: <FaInfo size={24} />
      },
      {},
      { route: '/user', title: 'User', description: 'User information', icon: <FaUser size={24} /> }
    ])
  )

  const routes = createRoutes([
    { route: '/', component: <Home /> },
    { route: '/about', component: <AboutUS /> },
    { route: '/user', component: <User /> }
  ])

  const userMenu = createUserMenu([
    { id: 'profile', title: 'My Profile', onClick: () => {} },
    { id: 'about', title: 'About us', onClick: () => {} },
    { id: 'logout', title: 'Logout', onClick: () => {} }
  ])

  const extraIcons = createExtraIcons([
    {
      id: 'beer',
      icon: <FaBeer />,
      badgeCount: 16
    }
  ])

  useEffect(() => {
    setTimeout(() => {
      setMenu((menu) => [...menu, { route: '/sarasa', title: 'sarasa' }])
    }, 1500)
  }, [])

  return (
    <ThemeProvider theme={createMuiTheme({ palette: { primary: orange } })}>
      <Navigator
        config={{ title: 'Example', contrastColor: '#FFF' }}
        menu={menu}
        routes={routes}
        userMenu={userMenu}
        extraIcons={extraIcons}
        menuDrawerIcon={<FaStar />}
      />
    </ThemeProvider>
  )
}

export default App
