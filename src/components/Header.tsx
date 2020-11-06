import React, { useCallback, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { fade, makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {
  FaEnvelope,
  FaHamburger,
  FaPersonBooth,
  FaPlus,
  FaSearch,
  FaSoundcloud
} from 'react-icons/fa'
import { useLang, useNavigator } from '../utils/NavigatorContext'

export default () => {
  const { title } = useNavigator()
  const lang = useLang()
  const classes = useClasses()

  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = useCallback((event: any) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleMobileMenuClose = useCallback(() => {
    setMobileMoreAnchorEl(null)
  }, [])

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }, [handleMobileMenuClose])

  const handleMobileMenuOpen = useCallback((event: any) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }, [])

  const menuId = 'primary-search-account-menu'
  const renderMenu = useCallback(
    () => (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    ),
    [anchorEl, handleMenuClose, isMenuOpen]
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = useCallback(
    () => (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label='show 4 new mails' color='inherit'>
            <Badge badgeContent={4} color='secondary'>
              <FaEnvelope />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label='show 11 new notifications' color='inherit'>
            <Badge badgeContent={11} color='secondary'>
              <FaSoundcloud />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label='account of current user'
            aria-controls='primary-search-account-menu'
            aria-haspopup='true'
            color='inherit'
          >
            <FaPersonBooth />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    ),
    [
      handleMobileMenuClose,
      handleProfileMenuOpen,
      isMobileMenuOpen,
      mobileMoreAnchorEl
    ]
  )

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
          >
            <FaHamburger />
          </IconButton>
          <Typography className={classes.title} variant='h6' noWrap>
            {title || 'Material-Navigator'}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <FaSearch />
            </div>
            <InputBase
              placeholder={lang.search}
              classes={{ root: classes.inputRoot, input: classes.inputInput }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color='inherit'>
              <Badge badgeContent={0} color='secondary'>
                <FaEnvelope />
              </Badge>
            </IconButton>
            <IconButton aria-label='show 17 new notifications' color='inherit'>
              <Badge badgeContent={17} color='secondary'>
                <FaSoundcloud />
              </Badge>
            </IconButton>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <FaPersonBooth />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <FaPlus />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu()}
      {renderMenu()}
    </div>
  )
}

const useClasses = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
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
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}))
