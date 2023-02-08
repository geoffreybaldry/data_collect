import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'

// Icons
import { HomeOutlined } from '@mui/icons-material'
import KeyIcon from '@mui/icons-material/Key'
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices'
import DnsIcon from '@mui/icons-material/Dns'
import BorderVerticalIcon from '@mui/icons-material/BorderVertical'
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek'
import FilterNoneIcon from '@mui/icons-material/FilterNone'
import AppsIcon from '@mui/icons-material/Apps'
import BackupIcon from '@mui/icons-material/Backup'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import FolderIcon from '@mui/icons-material/Folder'
import AllInboxIcon from '@mui/icons-material/AllInbox'
import SdStorageIcon from '@mui/icons-material/SdStorage'

function ProSideBar() {
  const sidebar = (
    <Sidebar>
      <Menu>
        <MenuItem icon={<HomeOutlined />} component={<Link to="/dashboard" />}>
          {' '}
          Dashboard
        </MenuItem>
        <SubMenu icon={<AllInboxIcon />} label="NetApp CVO">
          <MenuItem
            icon={<KeyIcon />}
            component={<Link to="/netappcvo/credentials" />}
          >
            {' '}
            Credentials
          </MenuItem>
          <MenuItem
            icon={<ElectricalServicesIcon />}
            component={<Link to="/netappcvo/connectors" />}
          >
            {' '}
            Connectors
          </MenuItem>
          <MenuItem
            icon={<DnsIcon />}
            component={<Link to="/netappcvo/workingenvironments" />}
          >
            {' '}
            Working Environments
          </MenuItem>
          <MenuItem
            icon={<BackupIcon />}
            component={<Link to="/netappcvo/workingenvironmentsbackup" />}
          >
            {' '}
            Working Env Backups
          </MenuItem>
          <MenuItem
            icon={<BorderVerticalIcon />}
            component={<Link to="/netappcvo/nodes" />}
          >
            {' '}
            Nodes
          </MenuItem>
          <MenuItem
            icon={<FilterNoneIcon />}
            component={<Link to="/netappcvo/instances" />}
          >
            {' '}
            Instances
          </MenuItem>
          <MenuItem
            icon={<CalendarViewWeekIcon />}
            component={<Link to="/netappcvo/aggregates" />}
          >
            {' '}
            Aggregates
          </MenuItem>
          <MenuItem
            icon={<AppsIcon />}
            component={<Link to="/netappcvo/providervolumes" />}
          >
            {' '}
            Provider Volumes
          </MenuItem>
          <MenuItem
            icon={<FolderIcon />}
            component={<Link to="/netappcvo/volumes" />}
          >
            {' '}
            Volumes
          </MenuItem>

          <SubMenu icon={<AttachMoneyIcon />} label="Costs">
            <MenuItem component={<Link to="/netappcvo/credentials" />}>
              {' '}
              WorEnv CBS Backup Cost
            </MenuItem>
          </SubMenu>
        </SubMenu>
        <SubMenu icon={<SdStorageIcon />} label="Other Storage"></SubMenu>
      </Menu>
    </Sidebar>
  )
  return sidebar
}

export default ProSideBar
