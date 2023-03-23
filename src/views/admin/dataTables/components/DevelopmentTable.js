/* eslint-disable */
import {
  Button,
  Flex,
  Icon,
  Progress,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
// Custom components
import Card from 'components/card/Card'
import { MdCheckCircle, MdCancel } from 'react-icons/md'
import Menu from 'components/menu/MainMenu'
import React, { useEffect, useMemo, useState } from 'react'
// import {
//   useGlobalFilter,
//   usePagination,
//   useSortBy,
//   useTable
// } from 'react-table'

//add datatable
import DataTable, { createTheme } from 'react-data-table-component'
//add csv export
import {CSVLink} from 'react-csv'

export default function DevelopmentTable (props) {
  const { columnsData, tableData, sensorList } = props
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  createTheme('dark', {
    text: {
      primary: textColor,
      secondary: textColor,
    },
    background: {
      default: 'transparent',
    },
    pagination: {
      style: {
        color: textColor
      },
      pageButtonsStyle: {
        color: textColor
      }
    },
    expanderButton: {
      style: {
        color: textColor,
      }
    }
  })

  const columns = useMemo(() => columnsData, [columnsData])
  const data = useMemo(() => tableData, [tableData])
  const sensors = useMemo(() => sensorList, [sensorList])

  // const tableInstance = useTable(
  //   {
  //     columns,
  //     data,
  //     initialState: {
  //       sortBy: [
  //           {
  //               id: '1',
  //               desc: true
  //           }
  //       ]
  //     }
  //   },
  //   useGlobalFilter,
  //   useSortBy,
  //   usePagination
  // )

  const formatDate = (string) => {
    let options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(string).toLocaleDateString([],options);
  }
  //for add datatable style and columns
  const columnsDatatable = [
    {
      id:1,
      name: "TIMESTAMP",
      sortable: true,
      selector: row => row.updatedAt,
      cell: (row) => (
          <Text color={textColor} fontSize='sm' fontWeight='700'>
            {formatDate(row.updatedAt)}
          </Text>
      ),
      style: {
        fontSize: "0.875rem",
        fontWeight: 700,
        color: "rgb(27, 37, 89)"
      }
    },
    {
      id:2,
      name: "STATUS",
      sortable: true,
      selector: row => row.status,
      cell: (row) => (
          <Flex align='center'>
            <Icon
                w='24px'
                h='24px'
                me='5px'
                color={
                  row.status >0 ? 'green.500' : 'red.500'
                  // ? 'red.500'
                  // : cell.value === 'Error'
                  // ? 'orange.500'
                  // : null
                }
                as={
                  row.status > 0 ? MdCheckCircle : MdCancel
                  // : cell.value === 'Error'
                  // ? MdOutlineError
                  // : null
                }
            />
            <Text color={textColor} fontSize='sm' fontWeight='700'>
              {/* {cell.value} */}
            </Text>
          </Flex>
      )
    },
    {
      id:3,
      name: "EFFICIENCY 1",
      sortable: true,
      selector: row => row.efficiency,
      cell: (row) => (
        <Flex align='center'>
          <Text
              me='10px'
              color={textColor}
              fontSize='sm'
              fontWeight='700'
          >
            {Math.trunc(row.efficiency)}%
          </Text>
          <Progress
              variant='table'
              colorScheme='brandScheme'
              h='8px'
              w='63px'
              value={row.efficiency}
          />
        </Flex>
      )
    },
    {
      id:4,
      name: "EFFICIENCY 2",
      sortable: true,
      selector: row => row.efficiency2,
      cell: (row) => (
        <Flex align='center'>
          <Text
              me='10px'
              color={textColor}
              fontSize='sm'
              fontWeight='700'
          >
            {(row.efficiency2) !=="N/A" ? Math.trunc(row.efficiency2) : 0}%
          </Text>
          <Progress
              variant='table'
              colorScheme='brandScheme'
              h='8px'
              w='63px'
              value={(row.efficiency2) !=="N/A" ? Math.trunc(row.efficiency2) : 0}
          />
        </Flex>
      )
    },
  ]
  const customStyles = {
    rows: {
      style: {
        minHeight: '57px',
        borderBottom: "none !important"
      },
    },
    headCells: {
      style: {
        color: "rgb(160, 174, 192)",
        fontWeight: 700,
        padding: "12px 10px 12px 24px"
      },
    },
    cells: {
      style: {
        padding: '16px 24px',
      },
    },
  }

  //get csv data
  let csvData =[
    ['TIMESTAMP', 'STATUS', 'EFFICIENCY1', 'EFFICIENCY2']
  ]
  const [sensorData, setSensorData] = useState(['TIMESTAMP', 'STATUS', 'EFFICIENCY1', 'EFFICIENCY2'])
  useEffect(() => {
    if(tableData.length > 0){
      tableData.sort((a,b) => (a.updatedAt < b.updatedAt) ? 1 : ((b.updatedAt < a.updatedAt) ? -1 : 0))
      //let cnt = tableData.length < 10 ? tableData.length : 10
      let cnt = tableData.length
      for(let i = 0; i < cnt; i++){
        let itemData = [formatDate(tableData[i].updatedAt), tableData[i].status, Math.trunc(tableData[i].efficiency) + "%", Math.trunc(tableData[i].efficiency2) + "%"]
        csvData[i+1] = itemData
      }
    }
    setSensorData(csvData)
  }, [tableData])


  // const {
  //   initialState
  // } = tableInstance
  // initialState.pageSize = 12

  const [isMounted, setIsMounted] = useState(false)

  const onSort = (selectedColumn, sortDirection, sortedRows) => {
    csvData =[
      ['TIMESTAMP', 'STATUS', 'EFFICIENCY1', 'EFFICIENCY2']
    ]
    if(sortedRows.length > 0){
      let cnt = sortedRows.length
      for(let i = 0; i < cnt; i++){
        let itemData = [formatDate(sortedRows[i].updatedAt), sortedRows[i].status, Math.trunc(sortedRows[i].efficiency) + "%", Math.trunc(sortedRows[i].efficiency2) + "%"]
        csvData[i+1] = itemData
      }
    }
    setSensorData(csvData)
  }
  // const [perPage, setPerPage] = useState(10)
  // const [page, setPage] = useState(1)
  // const onChangePage = (value) => {
  //   setPage(value)
  //   csvData =[
  //     ['TIMESTAMP', 'STATUS', 'EFFICIENCY']
  //   ]
  //   console.log(perPage, value)
  //   if(tableData.length > 0){
  //     let min = (value - 1) * perPage
  //     let max = value * perPage
  //     let cnt = tableData.length < max ? tableData.length : max
  //     for(let i = min; i < cnt; i++){
  //       let itemData = [tableData[i].updatedAt, tableData[i].status, Math.trunc(tableData[i].efficiency) + "%"]
  //       csvData[i - min + 1] = itemData
  //     }
  //     console.log(csvData)
  //   }
  //   setSensorData(csvData)
  // }
  // const onChangeRowsPerPage = (value) => {
  //   setPerPage(value)
  //   console.log(value, page)
  //   csvData =[
  //     ['TIMESTAMP', 'STATUS', 'EFFICIENCY']
  //   ]
  //   if(tableData.length > 0){
  //     let min = (page - 1) * value
  //     let max = page * value
  //     let cnt = tableData.length < max ? tableData.length : max
  //     for(let i = min; i < cnt; i++){
  //       let itemData = [tableData[i].updatedAt, tableData[i].status, Math.trunc(tableData[i].efficiency) + "%"]
  //       csvData[i - min + 1] = itemData
  //     }
  //     console.log(csvData)
  //   }
  //   setSensorData(csvData)
  // }

  useEffect(() => {
    if (isMounted) return
    setIsMounted(true)
  }, [isMounted])

  if (!isMounted) return <></>

  return (
    <Card
      flexDirection='column'
      w='100%'
      px='0px'
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'
        >
          History / {props.sensorName}
        </Text>
        <Button style={{position: "absolute", right: "80px"}}>
          <CSVLink data={sensorData} filename={"History.csv"} className="btn btn-primary">Export CSV</CSVLink>
        </Button>

        <Menu 
          sensorList={sensors}
          handler={props.handler}
        />
      </Flex>
      <DataTable
          columns={columnsDatatable} data={tableData} pagination={true} paginationRowsPerPageOptions={[10, 25, 50, 100]}
          customStyles={customStyles} theme="dark" defaultSortFieldId={1} defaultSortAsc={false} onSort={onSort}></DataTable>
    </Card>
  )
}
