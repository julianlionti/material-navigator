import React from 'react'
import { useNavigatorConfig } from 'material-navigator'

export default () => {
  useNavigatorConfig({ onlyContent: true })
  return <span>Prueba afuera</span>
}
