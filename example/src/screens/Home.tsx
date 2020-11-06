import React from 'react'
import { useNavigator } from 'material-navigator'

export default () => {
  const props = useNavigator({ title: 'Home' })
  console.log(props)
  return <p>Homes</p>
}
