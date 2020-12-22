import { Button } from '@material-ui/core'
import React from 'react'
import { useNavigator, useNavigatorConfig } from 'material-navigator'

export default () => {
  useNavigatorConfig({ title: 'Home', noSearch: true })
  const { setRightComponent, toggleRightDrawer, setLoading, loading } = useNavigator()

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
      <Button onClick={() => setLoading(!loading)}>Loading</Button>
      <p>Home</p>
    </div>
  )
}
