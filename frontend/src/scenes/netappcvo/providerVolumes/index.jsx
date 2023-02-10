import Header from 'components/Header'
import { DataGrid, GridFilterModel } from '@mui/x-data-grid'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import { useEffect, useState, useRef, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import useFetch from 'hooks/useFetch'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

function NetappCVOProviderVolumes() {
  const theme = useTheme()
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)')

  const { user } = useSelector((state) => state.auth)
  const options = useRef({
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
  })

  // values to be sent to the backend
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState({})
  const [searchInput, setSearchInput] = useState('')

  // const onFilterChange = useCallback((filterModel: GridFilterModel) => {
  const onFilterChange = useCallback((filterModel) => {
    // Here you save the data you need from the filter model
    // setQueryOptions({ filterModel: { ...filterModel } });
    setFilter(filterModel)
  }, [])

  // Load the working environment data from the DB
  const url = API_BASE_URL + '/api/providerVolume'
  const { data, loading, error } = useFetch(url, options.current, {
    page: page,
    pageSize: pageSize,
    search: search,
    sort: JSON.stringify(sort),
    filter: JSON.stringify(filter),
  })

  const columns = [
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      flex: 1,
    },
    {
      field: '$Aggregate.WorkingEnvironment.name$',
      headerName: 'Working Environment Name',
      flex: 1,
      valueGetter: (params) => {
        return params.row.Aggregate.WorkingEnvironment.name
      },
    },
    {
      field: '$Aggregate.name$',
      headerName: 'Aggregate Name',
      flex: 1,
      valueGetter: (params) => {
        return params.row.Aggregate.name
      },
    },
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'sizeBytes',
      headerName: 'Size (Bytes)',
      flex: 1,
    },
    {
      field: 'state',
      headerName: 'State',
      flex: 1,
    },
    {
      field: 'device',
      headerName: 'Device',
      flex: 1,
    },
    {
      field: 'instanceId',
      headerName: 'Instance ID',
      flex: 1,
    },
    {
      field: 'diskType',
      headerName: 'Disk Type',
      flex: 1,
    },
    {
      field: 'encrypted',
      headerName: 'Encrypted?',
      flex: 1,
    },
    {
      field: 'iops',
      headerName: 'IOPS',
      flex: 1,
    },
    {
      field: 'throughput',
      headerName: 'Throughput',
      flex: 1,
    },
    {
      field: 'instance2Id',
      headerName: 'Instance2 ID',
      flex: 1,
    },
    {
      field: 'aggregateId',
      headerName: 'Aggregate ID',
      flex: 2,
    },
  ]

  if (error) {
    toast.error(error)
    return <div>{error}</div>
  }

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header
          title="Netapp CVO Provider Volumes"
          subtitle="All Netapp CVO provider volumes"
        />

        <Box
          height="80vh"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: theme.palette.primary.light,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            initialState={{
              columns: {
                columnVisibilityModel: {
                  // workingEnvironmentId: false,
                },
              },
            }}
            loading={loading}
            getRowId={(row) => row.id}
            rows={(data && data.rows) || []}
            columns={columns}
            rowCount={(data && data.count) || 0}
            rowsPerPageOptions={[20, 30, 50, 100]}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            sortingMode="server"
            filterMode="server"
            onFilterModelChange={onFilterChange}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(newSortModel)}
            components={{ Toolbar: DataGridCustomToolbar }}
            componentsProps={{
              toolbar: {
                searchInput,
                setSearchInput,
                setSearch,
                csvOptions: { allColumns: true },
              },
            }}
            density="compact"
            // checkboxSelection={'true'}
          />
        </Box>
      </Box>
    </>
  )
}

export default NetappCVOProviderVolumes
