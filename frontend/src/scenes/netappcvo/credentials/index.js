import Header from 'components/Header'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import useFetch from 'hooks/useFetch'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import FlexBetween from 'components/FlexBetween'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function NetappCVOCredentials() {
  const theme = useTheme()
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)')

  const { user } = useSelector((state) => state.auth)
  const options = useRef({
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
  })

  const url = 'http://localhost:5000/api/credential'
  const { data, loading, error } = useFetch(url, options.current)

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Credentials Page"
        subtitle="This is the Credentials Page"
      />

      <Box>
        {loading ? (
          <div>Loading...</div>
        ) : (
          data.map((credential) => (
            <Card
              key={credential.accountId}
              variant="outlined"
              style={{ display: 'inline-block' }}
              sx={{ minWidth: 275 }}
            >
              <CardContent>
                <Typography variant="h4" component="div">
                  {credential.accountName}
                </Typography>
                <Typography variant="body2">{credential.accountId}</Typography>
              </CardContent>
              <CardActions>
                <FlexBetween gap="7rem">
                  {/* <Button size="small" onClick={() => navigate(feature.link)}> */}
                  <Button size="small">Edit</Button>
                  {/* <Button size="small" onClick={() => navigate(feature.link)}> */}
                  <Button size="small">Delete</Button>
                </FlexBetween>
              </CardActions>
            </Card>
          ))
        )}
      </Box>
    </Box>
  )
}

export default NetappCVOCredentials
