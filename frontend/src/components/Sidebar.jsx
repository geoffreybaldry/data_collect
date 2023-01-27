import React from 'react'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
} from '@mui/icons-material'
import GavelIcon from '@mui/icons-material/Gavel'
import FolderIcon from '@mui/icons-material/Folder'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import StorageIcon from '@mui/icons-material/Storage'
import CloudSyncIcon from '@mui/icons-material/CloudSync'
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices'
import DnsIcon from '@mui/icons-material/Dns'
import KeyIcon from '@mui/icons-material/Key'
import GridViewIcon from '@mui/icons-material/GridView'
import BorderVerticalIcon from '@mui/icons-material/BorderVertical'
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek'
import FilterNoneIcon from '@mui/icons-material/FilterNone'
import AppsIcon from '@mui/icons-material/Apps'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween'

const navItems = [
  {
    text: 'Dashboard',
    location: 'dashboard',
    icon: <HomeOutlined />,
  },
  {
    text: 'Netapp CVO',
    location: null,
    icon: null,
  },
  {
    text: 'Credentials',
    location: 'netappcvo/credentials',
    icon: <KeyIcon />,
  },
  {
    text: 'Connectors',
    location: 'netappcvo/connectors',
    icon: <ElectricalServicesIcon />,
  },
  {
    text: 'Working Envs',
    location: 'netappcvo/workingenvironments',
    icon: <DnsIcon />,
  },
  {
    text: 'Nodes',
    location: 'netappcvo/nodes',
    icon: <BorderVerticalIcon />,
  },
  {
    text: 'Instances',
    location: 'netappcvo/instances',
    icon: <FilterNoneIcon />,
  },
  {
    text: 'Aggregates',
    location: 'netappcvo/aggregates',
    icon: <CalendarViewWeekIcon />,
  },
  {
    text: 'Provider Volumes',
    location: 'netappcvo/providerVolumes',
    icon: <AppsIcon />,
  },
  {
    text: 'CVO Volumes',
    location: 'netappcvo/volumes',
    icon: <FolderIcon />,
  },
  {
    text: 'Some Other Storage',
    location: null,
    icon: null,
  },
  {
    text: 'Volumes',
    location: 'otherstoragevolumes',
    icon: <FolderIcon />,
  },
]

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation()
  const [active, setActive] = useState('')
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    setActive(pathname.substring(1))
  }, [pathname])

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: 'border-box',
              borderWidth: isNonMobile ? 0 : '2px',
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="primary"
                    onClick={() => navigate('/')}
                  >
                    Storage Guru
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, location, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
                      {text}
                    </Typography>
                  )
                }

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${location}`)
                        setActive(location)
                      }}
                      sx={{
                        backgroundColor:
                          active === location
                            ? theme.palette.secondary[300]
                            : 'transparent',
                        color:
                          active === location
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: '2rem',
                          color:
                            active === location
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === location && (
                        <ChevronRightOutlined sx={{ ml: 'auto' }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              {/* <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: 'cover' }}
              /> */}
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: '25px ',
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  )
}

export default Sidebar
