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
import { FaChevronLeft, FaHamburger } from 'react-icons/fa'
import { useHistory, useLocation } from 'react-router-dom'
import { useNavigator } from '../utils/NavigatorContext'

export default () => {
  const { menuDrawerWidth, drawer, toggleMenu, menu, maintainIcons } = useNavigator()
  const classes = useClasses({ drawerWidth: menuDrawerWidth, maintainIcons })
  const history = useHistory()
  const { pathname } = useLocation()

  return (
    <Drawer
      className={`${classes.drawer} ${drawer ? classes.drawerOpen : classes.drawerClose}`}
      variant={maintainIcons ? 'permanent' : 'persistent'}
      anchor='left'
      open={drawer}
      classes={{ paper: `${drawer ? classes.drawerOpen : classes.drawerClose}` }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={() => toggleMenu()}>
          {drawer ? <FaChevronLeft /> : <FaHamburger />}
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
                selected={pathname === route}
                onClick={() => {
                  if (onClick && !route) onClick(history)
                  if (route) history.push(route)

                  if (!maintainIcons) toggleMenu(false)
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
    width: '100%',
    whiteSpace: 'nowrap'
  }),
  // drawerPaper: ({ drawerWidth }: any) => ({
  //   [theme.breakpoints.up('sm')]: {
  //     width: drawerWidth
  //   },
  //   width: '100%'
  // }),
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  drawerOpen: ({ drawerWidth }: any) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }),
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(5) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1
    }
  }
}))
