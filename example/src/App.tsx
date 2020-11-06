import React from 'react'
import { FaBeer, FaCoffee, FaHome, FaInfo, FaUser } from 'react-icons/fa'
import {
  Navigator,
  createMenu,
  createUserMenu,
  createRoutes,
  useTitle,
  createExtraIcons,
  useNavigator,
  IconsProps
} from 'material-navigator'
import { Button } from '@material-ui/core'

const Home = () => {
  useTitle({ title: 'Home' })
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
  useTitle({ title: 'About US' })
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
  const menu = createMenu([
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

  const routes = createRoutes([
    { route: '/', component: <Home /> },
    { route: '/about', component: <AboutUS /> },
    { route: '/user', component: <User /> }
  ])

  const userMenu = createUserMenu([
    { id: 'profile', title: 'My Profile', onPress: () => {} },
    { id: 'about', title: 'About us', onPress: () => {} },
    { id: 'logout', title: 'Logout', onPress: () => {} }
  ])

  const extraIcons = createExtraIcons([
    {
      id: 'beer',
      icon: <FaBeer />,
      badgeCount: 16
    }
  ])

  return (
    <Navigator
      title='Example'
      menu={menu}
      routes={routes}
      withSearch
      showUser={true}
      userMenu={userMenu}
      extraIcons={extraIcons}
    />
  )
}

export default App
