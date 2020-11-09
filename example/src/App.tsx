import React, { useEffect, useState } from 'react'
import { FaBeer, FaCoffee, FaHome, FaInfo, FaStar, FaUser } from 'react-icons/fa'
import {
  Navigator,
  createMenu,
  createUserMenu,
  createRoutes,
  useNavigatorConfig,
  createExtraIcons,
  useNavigator,
  IconsProps
} from 'material-navigator'
import { Button } from '@material-ui/core'

const Home = () => {
  useNavigatorConfig({ title: 'Home', noSearch: true })
  const { setRightComponent, toggleRightDrawer } = useNavigator()
  return (
    <div>
      <Button
        onClick={() => {
          setRightComponent(() => (
            <div>
              <p>Sarasa</p>
            </div>
          ))
          toggleRightDrawer()
        }}
      >
        Agregar componente derecho abrir
      </Button>
      <p>Home</p>
    </div>
  )
}

const AboutUS = () => {
  useNavigatorConfig({ title: 'About US' })
  const { setExtraIcons } = useNavigator()
  return (
    <div>
      <Button
        onClick={() => {
          setExtraIcons((extra) => {
            const final: IconsProps[] = extra
            if (!final.find((e) => e.id === 'cofee'))
              final.push({ id: 'cofee', icon: <FaCoffee />, tooltip: 'Café' })

            return final.map((e) => {
              if (e.id === 'beer') {
                return {
                  ...e,
                  badgeCount: 8
                }
              }
              return e
            })
          })
        }}
      >
        Agregar Iconos
      </Button>
      <p>AboutUS</p>
    </div>
  )
}

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
    <Navigator
      config={{ title: 'Example' }}
      menu={menu}
      routes={routes}
      userMenu={userMenu}
      extraIcons={extraIcons}
      menuDrawerIcon={<FaStar />}
    />
  )
}

export default App
