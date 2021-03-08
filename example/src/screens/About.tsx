import { Button } from '@material-ui/core'
import React from 'react'
import { IconsProps, useNavigator, useNavigatorConfig } from 'material-navigator'
import { FaCoffee } from 'react-icons/fa'

export default () => {
  useNavigatorConfig({ noDrawerMenu: false, onlyContent: false })

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
      <Button
        onClick={() => {
          window.open(window.location.origin + '/fuera', '_blank', 'height=600,width=1200')
        }}
      >
        Fuera
      </Button>
      <p>AboutUS</p>
    </div>
  )
}
