import React, { useCallback, useState } from 'react'
import { Badge, Divider, ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { fade, makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Autocomplete } from '@material-ui/lab'
import { FaArrowLeft, FaHamburger, FaSearch, FaUser } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { useLang, useNavigator, useNavigatorConfig } from '../utils/NavigatorContext'

export default () => {
  const {
    title,
    onlyTitle,
    showUser,
    noSearch,
    noDrawerMenu,
    contrastColor,
    goBack,
    titleWidth
  } = useNavigatorConfig()

  const {
    menu,
    toggleMenu,
    drawer,
    menuDrawerWidth,
    menuDrawerIcon,
    userMenu,
    userIcon,
    extraIcons,
    maintainIcons
  } = useNavigator()

  const lang = useLang()
  const classes = useClasses({ drawerWidth: menuDrawerWidth, contrastColor, titleWidth })
  const history = useHistory()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleProfileMenuOpen = useCallback((event: any) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const renderMenu = useCallback(
    () => (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!anchorEl}
        onClose={handleMenuClose}
      >
        {userMenu
          ?.filter((e) => !e.hidden)
          .map(({ id, title, icon, onClick, keepOpen }, i) => {
            if (!id || !title || !onClick) return <Divider key={i} />
            return (
              <MenuItem
                key={id}
                onClick={() => {
                  onClick(history)
                  if (keepOpen) return
                  handleMenuClose()
                }}
              >
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText>{title}</ListItemText>
              </MenuItem>
            )
          })}
      </Menu>
    ),
    [anchorEl, handleMenuClose, history, userMenu]
  )

  return (
    <div className={classes.grow}>
      <AppBar position='fixed' className={`${classes.appBar} ${drawer ? classes.appBarShift : ''}`}>
        <Toolbar>
          {!onlyTitle && (!noDrawerMenu || goBack) && (
            <IconButton
              onClick={() => {
                if (goBack) history.goBack()
                else toggleMenu()
              }}
              edge='start'
              className={`${classes.menuButton} ${classes.icons} ${drawer ? classes.hide : ''}`}
              color='inherit'
            >
              {maintainIcons ? (
                <div style={{ width: 32 }} />
              ) : goBack ? (
                <FaArrowLeft />
              ) : (
                menuDrawerIcon || <FaHamburger />
              )}
            </IconButton>
          )}
          <Typography className={classes.title} variant='h6' noWrap>
            {title}
          </Typography>
          {!onlyTitle && !noSearch && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <FaSearch />
              </div>
              <Autocomplete
                freeSolo
                disableClearable
                options={menu.filter((e) => e.title && !e.hidden)}
                getOptionLabel={(e) => e.title || ''}
                renderOption={({ route, title, description }) => (
                  <ListItem
                    dense
                    component='div'
                    onClick={() => {
                      if (route) {
                        history.push(route)
                      }
                    }}
                  >
                    <ListItemText primary={title} secondary={description} />
                  </ListItem>
                )}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref} className={classes.autoRoot}>
                    <InputBase
                      {...params.inputProps}
                      placeholder={lang.search}
                      classes={{ root: classes.inputRoot, input: classes.inputInput }}
                      type='search'
                    />
                  </div>
                )}
              />
            </div>
          )}
          <div className={classes.grow} />
          <div>
            {extraIcons?.map(({ tooltip, badgeCount, icon, id, onClick }) => (
              <Tooltip title={tooltip || ''} key={id}>
                <IconButton className={classes.icons} onClick={onClick} color='inherit'>
                  <Badge badgeContent={badgeCount} color='secondary'>
                    {icon}
                  </Badge>
                </IconButton>
              </Tooltip>
            ))}
            {!onlyTitle && showUser && (
              <IconButton
                edge='end'
                className={classes.icons}
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                {userIcon || <FaUser />}
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu()}
    </div>
  )
}

const useClasses = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  appBar: {
    // zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: ({ drawerWidth }: any) => ({
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  }),
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  title: ({ contrastColor, titleWidth }: any) => ({
    display: 'none',
    color: contrastColor,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      width: titleWidth || 150
    }
  }),
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  autoRoot: {
    width: '100%'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  },
  icons: ({ contrastColor }: any) => ({
    color: contrastColor
  })
}))
