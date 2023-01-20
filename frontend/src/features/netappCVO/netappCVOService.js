import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const API_URL = '/api/volume'

const getVolumes = async (paginationObj, authToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    params: paginationObj,
  }

  const response = await axios.get(API_BASE_URL + API_URL, config)

  return response.data
}

// const updateIpoState = async (
//   { ipoContractAddress, newState, eventParameters },
//   authToken
// ) => {
//   console.log(
//     'Updating ipoState to ' +
//       newState +
//       ' for contract address ' +
//       ipoContractAddress
//   )

//   // Create object to represent update required to record
//   const ipoObj = {
//     ipoContractAddress: ipoContractAddress,
//     newIpoState: newState,
//   }

//   const config = {
//     headers: {
//       Authorization: `Bearer ${authToken}`,
//     },
//   }

//   const response = await axios.post(
//     API_BASE_URL + API_URL + '/update',
//     ipoObj,
//     config
//   )

//   return response.data
// }

// const createIpo = async (
//   { newIpoContractAddress, eventParameters },
//   authToken
// ) => {
//   // Extract the transaction from the eventParameters
//   const transaction = await eventParameters.getTransaction()
//   // Access an instance of the ContractService
//   const instance = ContractService.getInstance()
//   // Parse the values in the transaction
//   const parsedTransaction = await instance.parseTransaction(transaction)
//   // Access the input values that were used to create the contract
//   const args = parsedTransaction.args[0]
//   console.log('Args: ' + JSON.stringify(args))
//   // Put args into object to be sent to backend for insertion into DB
//   const ipoObj = {
//     ipoId: ethers.BigNumber.from(args[0]).toString(),
//     symbol: args[1],
//     issuerCompany: args[2],
//     openDate: args[3],
//     closeDate: args[4],
//     // The values are stored in wei in the contract, load them into the right format
//     // priceBandLow: ethers.BigNumber.from(args[5]).toNumber(),
//     // priceBandHigh: ethers.BigNumber.from(args[6]).toNumber(),
//     priceBandLow: ethers.BigNumber.from(args[5]).toString(),
//     priceBandHigh: ethers.BigNumber.from(args[6]).toString(),
//     lotSize: ethers.BigNumber.from(args[7]).toNumber(),
//     issueSize: ethers.BigNumber.from(args[8]).toNumber(),
//     ipoState: args[9],
//     ipoContractAddress: newIpoContractAddress,
//   }

//   const config = {
//     headers: {
//       Authorization: `Bearer ${authToken}`,
//     },
//   }

//   const response = await axios.post(
//     API_BASE_URL + API_URL + '/create',
//     ipoObj,
//     config
//   )

//   return response.data
// }

const netappCVOService = {
  getVolumes,
}

export default netappCVOService
