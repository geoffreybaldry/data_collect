import React, { useState } from 'react'
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Login,
  Logout,
} from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FlexBetween from './FlexBetween'
import { useDispatch } from 'react-redux'
import { logout, setMode } from 'features/auth/authSlice'
import {
  AppBar,
  Box,
  Typography,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
  Tooltip,
  Divider,
  ListItemIcon,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useProSidebar } from 'react-pro-sidebar'

// const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
const Navbar = ({ user }) => {
  const { collapseSidebar } = useProSidebar()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const theme = useTheme()

  // const neutralLight = theme.palette.neutral.light
  // const dark = theme.palette.neutral.dark
  // const background = theme.palette.background.default
  const primaryLight = theme.palette.primary.light
  // const alt = theme.palette.background.alt

  const [anchorEl, setAnchorEl] = useState(null)
  const isOpen = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const onLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <AppBar
      sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* LEFT SIDE */}
        {user ? (
          <FlexBetween>
            {/* <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}> */}
            <IconButton onClick={() => collapseSidebar()}>
              <MenuIcon />
            </IconButton>
          </FlexBetween>
        ) : (
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate('/')}
            sx={{
              '&:hover': {
                color: primaryLight,
                cursor: 'pointer',
              },
            }}
          >
            Storage Guru
          </Typography>
        )}

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton size="medium" onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton>

          <Tooltip title="Account settings">
            <IconButton size="medium" onClick={handleClick}>
              <AccountCircleIcon sx={{ fontSize: '25px' }} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={isOpen}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {/* <Divider /> */}

            {user ? (
              <MenuItem onClick={onLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            ) : (
              <MenuItem onClick={() => navigate('/login')}>
                <ListItemIcon>
                  <Login fontSize="small" />
                </ListItemIcon>
                Login
              </MenuItem>
            )}
          </Menu>
          {user && (
            <Box textAlign="left">
              <Typography
                fontWeight="bold"
                fontSize="0.85rem"
                sx={{ color: theme.palette.secondary[100] }}
              >
                {`${user.firstName} ${user.lastName}`}
              </Typography>
              {/* <Typography
                fontSize="0.75rem"
                sx={{ color: theme.palette.secondary[200] }}
              >
                {user.occupation}
              </Typography> */}
            </Box>
          )}

          {/* <Button
              onClick={handleClick}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textTransform: 'none',
                gap: '1rem',
              }}
            >
              
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: '25px' }}
              />
            </Button>
           
          {/* </FlexBetween> */}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
