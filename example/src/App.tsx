import React from 'react'

import { Navigator, createMenu, createUserMenu, createRoutes, useTitle } from 'material-navigator'

const Home = () => {
  useTitle({ title: 'Home' })
  return <p>Home</p>
}

const AboutUS = () => {
  useTitle({ title: 'About US' })
  return <p>AboutUS</p>
}

const User = () => {
  return <p>User</p>
}

const App = () => {
  const menu = createMenu([
    { route: '/', title: 'Home', description: 'Home screen' },
    { route: '/about', title: 'About US', description: 'Information about Material Navigator' },
    {},
    { route: '/user', title: 'User', description: 'User information' }
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

  return (
    <Navigator
      title='Example'
      menu={menu}
      routes={routes}
      withSearch
      showUser={true}
      userMenu={userMenu}
    />
  )
}

export default App
