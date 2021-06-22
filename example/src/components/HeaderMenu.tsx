import { makeStyles } from '@material-ui/core'
import React from 'react'

const HeaderMenu = () => {
  const classes = useClasses()
  return <div className={classes.root}></div>
}

const useClasses = makeStyles(() => ({
  root: {
    height: 250,
    backgroundColor: 'red'
  }
}))

export default HeaderMenu
