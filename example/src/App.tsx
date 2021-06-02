import React, { lazy, useMemo, useState } from 'react'
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
import Fuerta from './screens/Fuerta'
import { ReactComponent as Logo } from './assets/logo.svg'
import { isTemplateTail } from 'typescript'

const Home = lazy(() => import('./screens/Home'))
const AboutUS = lazy(() => import('./screens/About'))

const User = () => {
  return <p>User</p>
}

const App = () => {
  const [auth, setAuth] = useState(false)

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
    { route: '/', component: <Home setAuth={setAuth} auth={auth} /> },
    { route: '/about', component: <AboutUS /> },
    { route: '/user', component: <User />, hidden: !auth },
    { route: '/fuera', component: <Fuerta />, hidden: false }
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

  const renderMenuDrawerHeader = useMemo(() => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaStar />
        <p>User</p>
      </div>
    )
  }, [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     setMenu((menu) => [...menu, { route: '/sarasa', title: 'sarasa' }])
  //   }, 1500)
  // }, [])

  return (
    <ThemeProvider theme={createMuiTheme({ palette: { primary: orange } })}>
      <Navigator
        config={{ title: 'Example', contrastColor: '#FFF' }}
        menu={menu}
        routes={routes}
        userMenu={userMenu}
        extraIcons={extraIcons}
        blockUi='bottomRight'
        // menuDrawerIcon={<FaH />}
        // menuDrawerIcon={<Logo height={40} />}
        // menuDrawerHeader={renderMenuDrawerHeader}
        maintainIcons
        loginPath='/'
        multipleRoutesComponent={(history) =>
          history.location.pathname !== '/' && (
            <button
              style={{ position: 'absolute', top: 90, right: 15 }}
              onClick={() => console.log(history)}
            >
              SIEMPRE EN DOM
            </button>
          )
        }
      />
    </ThemeProvider>
  )
}

export default App
