import React from 'react'
import { Divider, Drawer, IconButton, makeStyles } from '@material-ui/core'
import { FaChevronRight } from 'react-icons/fa'
import { useNavigator } from '../utils/NavigatorContext'

export default () => {
  const { right, rightComponent, rightDrawerWidth, toggleRightDrawer } = useNavigator()

  const classes = useClasses({ drawerWidth: rightDrawerWidth })

  if (!rightComponent) return null
  return (
    <Drawer
      className={classes.drawer}
      variant='temporary'
      anchor='right'
      open={right}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={() => toggleRightDrawer()}>
          <FaChevronRight />
        </IconButton>
      </div>
      <Divider />
      {rightComponent()}
    </Drawer>
  )
}

const useClasses = makeStyles((theme) => ({
  drawer: ({ drawerWidth }: any) => ({
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth
    },
    width: '100%'
  }),
  drawerPaper: ({ drawerWidth }: any) => ({
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth
    },
    width: '100%'
  }),
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  }
}))
