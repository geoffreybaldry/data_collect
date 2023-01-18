import { Box, useMediaQuery } from '@mui/material'
import Header from 'components/Header'
import { React } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
// import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
// import ipo_apply from 'images/ipo_apply.jpg'
// import ipo_list from 'images/ipo_list.jpg'
// import ipo_magnifying_glass from 'images/ipo_magnifying_glass.jpg'

function Landing() {
  // const theme = useTheme()
  const navigate = useNavigate()
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)')

  const cardStyle = {
    display: 'block',
    height: '200px',
  }

  const features = [
    {
      title: 'View IPOs',
      description: 'Take a look at Current and Past IPOs.',
      link: '/ipoview',
      // image: ipo_list,
    },
    {
      title: 'Check IPO Subscriptions',
      description: 'Check live subscription details of any IPO.',
      link: '/ipoview',
      // image: ipo_magnifying_glass,
    },
    {
      title: 'Apply',
      description: 'Apply for open IPO',
      link: '/ipoview',
      // image: ipo_apply,
    },
  ]

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Welcome to IPO Smart Registrar"
        subtitle="Using this dApp, you could:"
      />

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        // gridAutoRows="160px"
        gap="20px"
        sx={{
          '& > div': {
            gridColumn: isNonMediumScreens ? undefined : 'span 12',
          },
        }}
      >
        {/* ROW 1 */}
        {features.map((feature) => (
          <Box key={feature.title} sx={{ minWidth: 275 }}>
            {/* <CardMedia
              sx={{ height: 140 }}
              image={feature.image}
              title={feature.title}
            /> */}
            <Card variant="outlined" style={cardStyle}>
              <CardContent>
                <Typography variant="h4" component="div">
                  {feature.title}
                </Typography>
                <Typography variant="body2">{feature.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate(feature.link)}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
        {/* ROW 1 End */}
      </Box>
    </Box>
  )
  // return (
  //   <div>
  //     <h1>Welcome to IPO Smart Registrar</h1>
  //     <hr />
  //     <h4>Using this dApp, you could:</h4>
  //     <ul>
  //       <li>Have a look at current and IPOs</li>
  //       <li>Have a look at past IPOs</li>
  //       <li>Check live subscription details of any IPO</li>
  //       <li>Apply for open IPO</li>
  //     </ul>
  //     <p>Login/Register and connect your MetaMask wallet to start exploring!</p>
  //     <p><a href="./ipoview">IPO Board</a></p>
  //   </div>
  // )
}

export default Landing
