import { Button } from '@material-ui/core'
import React from 'react'
import { useNavigator, useNavigatorConfig } from 'material-navigator'

export default ({ setAuth, auth }: any) => {
  useNavigatorConfig({ title: 'Home', noSearch: true })
  const { setRightComponent, toggleRightDrawer, setLoading, loading } = useNavigator()

  return (
    <div>
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
      <Button onClick={() => setLoading(!loading, 'bottomRight')}>BOTTOM RIGHT</Button>
      <Button onClick={() => setLoading(!loading)}>BACKDROP</Button>
      <Button onClick={() => setAuth(!auth)}>Auth</Button>
    </div>
  )
}
