import React from 'react'
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from '@material-ui/core'
import { FaChevronLeft } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { useNavigator } from '../utils/NavigatorContext'

export default () => {
  const { menuDrawerWidth, drawer, toggleMenu, menu } = useNavigator()
  const classes = useClasses({ drawerWidth: menuDrawerWidth })
  const history = useHistory()
  return (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      anchor='left'
      open={drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={() => toggleMenu()}>
          <FaChevronLeft />
        </IconButton>
      </div>
      <Divider />
      <List>
        {menu
          .filter((e) => !e.hidden)
          .map(({ route, title, icon, onClick }, i) => {
            if (!route && !title) return <Divider key={i} />
            return (
              <ListItem
                button
                key={title}
                onClick={() => {
                  if (onClick && !route) onClick(history)
                  if (route) history.push(route)

                  toggleMenu(false)
                }}
              >
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={title} />
              </ListItem>
            )
          })}
      </List>
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
