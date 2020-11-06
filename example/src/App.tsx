import React from 'react'

import { Navigator, createMenu, createRoutes } from 'material-navigator'
import Home from './screens/Home'

const AboutUS = () => {
  return <p>AboutUS</p>
}

const App = () => {
  const menu = createMenu([
    { id: 'home', title: 'Home' },
    { id: 'home', title: 'About US' }
  ])

  const routes = createRoutes([
    { route: '/', component: <Home /> },
    { route: '/about', component: <AboutUS /> }
  ])

  return <Navigator title='Example' menu={menu} routes={routes} />
}

export default App
