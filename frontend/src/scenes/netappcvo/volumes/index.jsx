import Header from 'components/Header'
import { DataGrid, GridFilterModel } from '@mui/x-data-grid'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import { useEffect, useState, useRef, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import useFetch from 'hooks/useFetch'

function NetappCVOVolumes() {
  console.log('Loaded CVO Volumes')
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

  // Load the volume data from the DB
  const url = 'http://localhost:5000/api/volume'
  const { data, loading, error } = useFetch(url, options.current, {
    page: page,
    pageSize: pageSize,
    search: search,
    sort: JSON.stringify(sort),
    filter: JSON.stringify(filter),
  })

  const columns = [
    {
      field: 'workingEnvironmentId',
      headerName: 'Working Environment ID',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'uuid',
      headerName: 'UUID',
      flex: 1,
    },
    {
      field: 'svmName',
      headerName: 'SVM Name',
      flex: 1,
    },
    {
      field: 'sizeBytes',
      headerName: 'Size (Bytes)',
      flex: 1,
    },
    {
      field: 'usedSizeBytes',
      headerName: 'Used Size (Bytes)',
      flex: 1,
    },
    {
      field: 'junctionPath',
      headerName: 'Junction Path',
      flex: 1,
    },
    {
      field: 'volumeTotalInodes',
      headerName: 'Total Inodes',
      flex: 1,
    },
    {
      field: 'volumeUsedInodes',
      headerName: 'Used Inodes',
      flex: 1,
    },
    {
      field: 'mountPoint',
      headerName: 'Mount Point',
      flex: 1,
    },
    {
      field: 'compressionSpaceSavedBytes',
      headerName: 'Compression Space Saved (Bytes)',
      flex: 1,
    },
    {
      field: 'deduplicationSpaceSavedBytes',
      headerName: 'Deduplication Space Saved (Bytes)',
      flex: 1,
    },
    {
      field: 'thinProvisioning',
      headerName: 'Thin Provisioning',
      flex: 1,
    },
    {
      field: 'compression',
      headerName: 'Compression',
      flex: 1,
    },
    {
      field: 'deduplication',
      headerName: 'Deduplication',
      flex: 1,
    },
    {
      field: 'snapshotPolicy',
      headerName: 'Snapshot Policy',
      flex: 1,
    },
    {
      field: 'securityStyle',
      headerName: 'Security Style',
      flex: 1,
    },
    {
      field: 'rootVolume',
      headerName: 'Root Volume',
      flex: 1,
    },
    {
      field: 'state',
      headerName: 'State',
      flex: 1,
    },
    {
      field: 'volumeType',
      headerName: 'Volume Type',
      flex: 1,
    },
    {
      field: 'aggregateName',
      headerName: 'Aggregate Name',
      flex: 1,
    },
    {
      field: 'parentSnapshot',
      headerName: 'Parent Snapshot',
      flex: 1,
    },
    {
      field: 'autoSizeMode',
      headerName: 'Autosize Mode',
      flex: 1,
    },
    {
      field: 'maxGrowSizeBytes',
      headerName: 'Max Grow Size (Bytes)',
      flex: 1,
    },
    {
      field: 'providerVolumeType',
      headerName: 'Provider Volume Type',
      flex: 1,
    },
    {
      field: 'capacityTier',
      headerName: 'Capacity Tier',
      flex: 1,
    },
    {
      field: 'capacityTierUsedSizeBytes',
      headerName: 'Capacity Tier Used Size (Bytes)',
      flex: 1,
    },
    {
      field: 'tieringPolicy',
      headerName: 'Tiering Policy',
      flex: 1,
    },
    {
      field: 'comment',
      headerName: 'Comment',
      flex: 1,
    },
    {
      field: 'snapshotsUsedSizeBytes',
      headerName: 'Snapshot Used Size (Bytes)',
      flex: 1,
    },
  ]

  if (error) {
    toast.error(error)
    return <div>{error}</div>
  }

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="Netapp CVO Volumes" subtitle="All Netapp CVO volumes" />

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
            loading={loading}
            getRowId={(row) => row.id}
            rows={(data && data.rows) || []}
            columns={columns}
            rowCount={(data && data.count) || 0}
            rowsPerPageOptions={[20, 50, 100]}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            sortingMode="server"
            filterMode="server"
            onFilterModelChange={onFilterChange}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            // onSortModelChange={(newSortModel) => setSort(...newSortModel)}
            onSortModelChange={(newSortModel) => setSort(newSortModel)}
            components={{ Toolbar: DataGridCustomToolbar }}
            componentsProps={{
              toolbar: { searchInput, setSearchInput, setSearch },
            }}
            // checkboxSelection={'true'}
          />
        </Box>
      </Box>
    </>
  )
}

export default NetappCVOVolumes
