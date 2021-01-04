import { Button } from '@material-ui/core'
import React from 'react'
import { IconsProps, useNavigator, useNavigatorConfig } from 'material-navigator'
import { FaCoffee } from 'react-icons/fa'

export default () => {
  useNavigatorConfig({ noDrawerMenu: true })

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
