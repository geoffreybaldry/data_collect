import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import netappCVOService from './netappCVOService'

const initialState = {
  volumes: [],
  status: 'idle',
  message: '',
}

// Register user
export const getVolumes = createAsyncThunk(
  'netappCVO/getVolumes',
  async (paginationObj, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await netappCVOService.getVolumes(paginationObj, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const netappCVOSlice = createSlice({
  name: 'netappCVO',
  initialState,
  reducers: {
    reset: (state) => {
      state.volumes = []
      state.status = 'idle'
      state.message = ''
    },
    // setMode: (state) => {
    //   state.mode = state.mode === 'light' ? 'dark' : 'light'
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVolumes.pending, (state) => {
        state.status = 'getVolumes'
      })
      .addCase(getVolumes.fulfilled, (state, action) => {
        state.status = 'getVolumesSucceeded'
        state.message = ''
        state.volumes = action.payload
      })
      .addCase(getVolumes.rejected, (state, action) => {
        state.status = 'error'
        state.message = action.payload
        state.volumes = []
      })
  },
})

export const { reset, setMode } = netappCVOSlice.actions
export default netappCVOSlice.reducer
