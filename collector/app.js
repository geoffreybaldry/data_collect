const axios = require('axios')
const dotenv = require('dotenv').config()
const FormData = require('form-data')

// Environment variables
const NETAPP_OAUTH_URL = process.env.NETAPP_OAUTH_URL
const NETAPP_API_URL = process.env.NETAPP_API_URL
const NETAPP_API_SERVICES_URL = process.env.NETAPP_API_SERVICES_URL
const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL
const NETAPP_CLOUDMANAGER_URL = process.env.NETAPP_CLOUDMANAGER_URL

const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const CLIENT_ID = process.env.CLIENT_ID

const USER_EMAIL = process.env.USER_EMAIL
const USER_PASSWORD = process.env.USER_PASSWORD

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
  const API_URL = '/oauth/token'
  const body = env
    ? {
        grant_type: 'client_credentials',
        client_secret: envs[env].client_secret,
        audience: NETAPP_API_URL,
        client_id: envs[env].client_id,
      }
    : {
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
      }

  try {
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

const getAggregates = async (
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
      '/occm/api/aws/ha/aggregates?workingEnvironmentId=' +
      workingEnvironmentId
    : primaryCallbackUri +
      '/occm/api/vsa/aggregates?workingEnvironmentId=' +
      workingEnvironmentId
  try {
    const response = await axios.get(url, {
      headers,
    })
    return response.data
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
    throw error
  }
}

const getWorkingEnvironmentBackup = async (
  access_token,
  workingEnvironmentPublicId,
  accountId,
  agentId
) => {
  const headers = {
    Authorization: 'Bearer ' + access_token,
    'X-Agent-Id': agentId,
  }

  const url =
    NETAPP_CLOUDMANAGER_URL +
    '/account/' +
    accountId +
    '/providers/cloudmanager_cbs/api/v1/backup/working-environment/' +
    workingEnvironmentPublicId

  try {
    const response = await axios.get(url, {
      headers,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

const getBackups = async (
  access_token,
  workingEnvironmentPublicId,
  accountId,
  agentId
) => {
  const headers = {
    Authorization: 'Bearer ' + access_token,
    'X-Agent-Id': agentId,
  }

  const url =
    NETAPP_CLOUDMANAGER_URL +
    '/account/' +
    accountId +
    '/providers/cloudmanager_cbs/api/v1/backup/working-environment/' +
    workingEnvironmentPublicId +
    '/volume'

  try {
    const response = await axios.get(url, {
      headers,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

async function main() {
  // Get an access token for sending data to backend
  const options = {
    email: USER_EMAIL,
    password: USER_PASSWORD,
  }
  const response = await axios.post(
    BACKEND_API_BASE_URL + '/api/auth/login',
    options
  )

  // Get an access token to use for accessing the backend
  const backend_access_token = response.data.token
  console.log('Got backend access token : ' + backend_access_token)

  // Get an access token form accessing cloud manager (for backup info)
  const cloud_manager_access_token = await getAccessToken()
  console.log('Got CloudManager access token : ' + cloud_manager_access_token)

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
          connector,
          {
            headers: {
              Authorization: 'Bearer ' + backend_access_token,
            },
          }
        )

        // Get the working environments for the connector
        const workingEnvironments = await getWorkingEnvironments(
          access_token,
          connector.primaryCallbackUri,
          'OntapClusterProperties,awsProperties'
        )

        if (workingEnvironments) {
          for (const workingEnvironment of workingEnvironments) {
            console.log(' - (Working Environment) ' + workingEnvironment.name)
            await axios.post(
              BACKEND_API_BASE_URL + '/api/workingEnvironment',
              workingEnvironment,
              {
                headers: {
                  Authorization: 'Bearer ' + backend_access_token,
                },
              }
            )

            // Process the nodes of the working environment
            const nodes = workingEnvironment.ontapClusterProperties.nodes
            for (const node of nodes) {
              console.log(' - (node) ' + node.name)
              await axios.post(
                BACKEND_API_BASE_URL + '/api/node',
                {
                  ...node,
                  workingEnvironmentPublicId: workingEnvironment.publicId,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + backend_access_token,
                  },
                }
              )
            }

            // Process the instances of the working environment
            const instances = workingEnvironment.awsProperties.instances
            for (const instance of instances) {
              console.log(' - (instance) ' + instance.name)
              await axios.post(
                BACKEND_API_BASE_URL + '/api/instance',
                {
                  ...instance,
                  workingEnvironmentPublicId: workingEnvironment.publicId,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + backend_access_token,
                  },
                }
              )
            }

            // Get the overall backup status for the working environment
            try {
              const workingEnvironmentBackup =
                await getWorkingEnvironmentBackup(
                  cloud_manager_access_token,
                  workingEnvironment.publicId,
                  connector.account,
                  connector.agentId + 'clients'
                )

              console.log(
                '  - (workingEnvironmentBackup) ' +
                  workingEnvironmentBackup.name
              )
              await axios.post(
                BACKEND_API_BASE_URL + '/api/workingEnvironmentBackup',
                {
                  ...workingEnvironmentBackup,
                  workingEnvironmentPublicId: workingEnvironment.publicId,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + backend_access_token,
                  },
                }
              )
            } catch (error) {
              console.log(
                'Error with workingEnvironmentBackup ' +
                  workingEnvironment.name +
                  '. ' +
                  error.message
              )
            }

            // Get the aggregates on the working environment
            const aggregates = await getAggregates(
              access_token,
              connector.primaryCallbackUri,
              workingEnvironment.publicId,
              workingEnvironment.isHA
            )

            for (const aggregate of aggregates) {
              console.log('  - (aggregate) ' + aggregate.name)
              await axios.post(
                BACKEND_API_BASE_URL + '/api/aggregate',
                {
                  ...aggregate,
                  workingEnvironmentPublicId: workingEnvironment.publicId,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + backend_access_token,
                  },
                }
              )

              // Get the provider volumes from the aggregate
              for (const providerVolume of aggregate.providerVolumes) {
                console.log('   - (Provider Volume) ' + providerVolume.id)
                await axios.post(
                  BACKEND_API_BASE_URL + '/api/providerVolume',
                  {
                    ...providerVolume,
                    aggregateId:
                      workingEnvironment.publicId + ':' + aggregate.name,
                  },
                  {
                    headers: {
                      Authorization: 'Bearer ' + backend_access_token,
                    },
                  }
                )
              }
            }

            // Get the volumes on the working environment
            const volumes = await getVolumes(
              access_token,
              connector.primaryCallbackUri,
              workingEnvironment.publicId,
              workingEnvironment.isHA
            )

            for (const volume of volumes) {
              console.log('  - (volume) ' + volume.name)
              await axios.post(
                BACKEND_API_BASE_URL + '/api/volume',
                {
                  ...volume,
                  workingEnvironmentPublicId: workingEnvironment.publicId,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + backend_access_token,
                  },
                }
              )
            }

            // Get the individual volume backups for the working environment
            const backups = await getBackups(
              cloud_manager_access_token,
              workingEnvironment.publicId,
              connector.account,
              connector.agentId + 'clients'
            )

            // We want to create a volume 'hasOne' relationship to backups.
            // A volume might not have a backup and vice-versa.
            // When we insert the backup, we'll add the volume's id as a foreign key
            // if it exists, and null if it doesn't
            for (const backup of backups.volume) {
              console.log('  - (backup) ' + backup.name)
              // Check if we found an equiv volume for this backup
              var volumeUUID = null
              for (const volume of volumes) {
                if (volume.uuid === backup['file-system-id']) {
                  volumeUUID = volume.uuid
                  break
                }
              }
              await axios.post(
                BACKEND_API_BASE_URL + '/api/volumebackup',
                {
                  ...backup,
                  volumeUUID: volumeUUID,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + backend_access_token,
                  },
                }
              )
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
