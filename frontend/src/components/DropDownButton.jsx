import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

export default function DropDownButton({
  params,
  handleOpenIpoMain,
  handleCloseIpoMain,
  handleScrapIpoMain,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenIpo = () => {
    handleOpenIpoMain(params)
  }
  const handleCloseIpo = () => {
    handleCloseIpoMain(params)
  }
  const handleScrapIpo = () => {
    handleScrapIpoMain(params)
  }

  return (
    <div>
      <Button onClick={handleClick}>Actions</Button>
      {params.row.ipoState === 0 && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleOpenIpo}>Open IPO</MenuItem>
          <MenuItem onClick={handleScrapIpo}>Scrap IPO</MenuItem>
        </Menu>
      )}

      {params.row.ipoState === 1 && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleCloseIpo}>Close IPO</MenuItem>
          <MenuItem onClick={handleScrapIpo}>Scrap IPO</MenuItem>
        </Menu>
      )}

      {params.row.ipoState === 3 && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleOpenIpo}>Re-Open IPO</MenuItem>
        </Menu>
      )}
    </div>
  )
}
