const axios = require('axios')
const dotenv = require('dotenv').config()
const FormData = require('form-data')

// Environment variables
const NETAPP_OAUTH_URL = process.env.NETAPP_OAUTH_URL
const NETAPP_API_URL = process.env.NETAPP_API_URL
const NETAPP_API_SERVICES_URL = process.env.NETAPP_API_SERVICES_URL
const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL

const envs = {
  prod: {
    client_secret: process.env.svcClientSecretProd,
    client_id: process.env.svcClientIdProd,
  },
  preprod: {
    client_secret: process.env.svcClientSecretPreProd,
    client_id: process.env.svcClientIdPreProd,
  },
  dev: {
    client_secret: process.env.svcClientSecretDev,
    client_id: process.env.svcClientIdDev,
  },
}

const getAccessToken = async (env) => {
  try {
    const API_URL = '/oauth/token'
    const body = {
      grant_type: 'client_credentials',
      client_secret: envs[env].client_secret,
      audience: NETAPP_API_URL,
      client_id: envs[env].client_id,
    }

    const response = await axios.post(NETAPP_OAUTH_URL + API_URL, body)
    return response.data.access_token
  } catch (error) {
    console.log(error)
  }
}

const getCloudManagerConnectors = async (access_token) => {
  const API_URL = '/occm/list-occms'

  const headers = {
    Authorization: 'Bearer ' + access_token,
  }

  try {
    const response = await axios.get(NETAPP_API_SERVICES_URL + API_URL, {
      headers,
    })
    return response.data.occms
  } catch (error) {
    throw error
  }
}

const getWorkingEnvironments = async (
  access_token,
  primaryCallbackUri,
  fields
) => {
  const headers = {
    Authorization: 'Bearer ' + access_token,
  }

  try {
    const response = await axios.get(
      primaryCallbackUri + '/occm/api/working-environments?fields=' + fields,
      {
        headers,
      }
    )
    return response.data.vsaWorkingEnvironments
  } catch (error) {
    throw error
  }
}

const getVolumes = async (
  access_token,
  primaryCallbackUri,
  workingEnvironmentId,
  isHA
) => {
  const headers = {
    Authorization: 'Bearer ' + access_token,
  }

  const url = isHA
    ? primaryCallbackUri +
      '/occm/api/aws/ha/volumes?workingEnvironmentId=' +
      workingEnvironmentId
    : primaryCallbackUri +
      '/occm/api/vsa/volumes?workingEnvironmentId=' +
      workingEnvironmentId
  try {
    const response = await axios.get(url, {
      headers,
    })
    return response.data
  } catch (error) {
    // throw error
    console.log('bad')
  }
}

async function main() {
  for (const env of Object.keys(envs)) {
    // Get an access token
    const access_token = await getAccessToken(env)
    // console.log('Access Token : ' + access_token)

    // Put the CloudManagerConnectors into the database
    try {
      // Using the access token, get the list of CloudManagers
      const cloudManagerConnectors = await getCloudManagerConnectors(
        access_token
      )

      for (const connector of cloudManagerConnectors) {
        console.log(connector.occmName)
        await axios.post(
          BACKEND_API_BASE_URL + '/api/cloudManagerConnector',
          connector
        )

        // Get the working environments for the connector
        const workingEnvironments = await getWorkingEnvironments(
          access_token,
          connector.primaryCallbackUri
          // 'OntapClusterProperties,awsProperties'
        )

        if (workingEnvironments) {
          for (const workingEnvironment of workingEnvironments) {
            console.log(' - ' + workingEnvironment.name)
            await axios.post(
              BACKEND_API_BASE_URL + '/api/workingEnvironment',
              workingEnvironment
            )

            // Get the volumes on the working environment
            const volumes = await getVolumes(
              access_token,
              connector.primaryCallbackUri,
              workingEnvironment.publicId,
              workingEnvironment.isHA
            )

            for (const volume of volumes) {
              console.log('  - ' + volume.name)
              // console.log(volume)
              await axios.post(BACKEND_API_BASE_URL + '/api/volume', {
                ...volume,
                workingEnvironmentId: workingEnvironment.publicId,
              })
            }
          }
        }
      }
    } catch (error) {
      throw error
    }
  }
}

if (require.main === module) {
  main()
}
