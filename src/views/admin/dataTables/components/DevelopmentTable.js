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
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable
} from 'react-table'

//add datatable
import DataTable from 'react-data-table-component'
//add csv export
import {CSVLink} from 'react-csv'

export default function DevelopmentTable (props) {
  const { columnsData, tableData, sensorList } = props

  const columns = useMemo(() => columnsData, [columnsData])
  const data = useMemo(() => tableData, [tableData])
  const sensors = useMemo(() => sensorList, [sensorList])

  const tableInstance = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )


  //for add datatable style and columns
  const columnsDatatable = [
    {
      name: "TIMESTAMP",
      sortable: true,
      selector: row => row.updatedAt,
      style: {
        fontSize: "0.875rem",
        fontWeight: 700,
        color: "rgb(27, 37, 89)"
      }
    },
    {
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
      name: "EFFICIENCY",
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
    ['TIMESTAMP', 'STATUS', 'EFFICIENCY']
  ]
  const [sensorData, setSensorData] = useState(['TIMESTAMP', 'STATUS', 'EFFICIENCY'])
  useEffect(() => {
    if(tableData.length > 0){
      for(let i = 0; i < tableData.length; i++){
        let itemData = [tableData[i].updatedAt, tableData[i].status, Math.trunc(tableData[i].efficiency) + "%"]
        csvData[i+1] = itemData
      }
      console.log(csvData)
    }
    setSensorData(csvData)
  }, [tableData])

  const {
    initialState
  } = tableInstance
  initialState.pageSize = 12

  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const [isMounted, setIsMounted] = useState(false)
 

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
        <Button>
          <CSVLink data={sensorData} filename={"History.csv"} className="btn btn-primary">Export CSV</CSVLink>
        </Button>

        <Menu 
          sensorList={sensors}
          handler={props.handler}
        />
      </Flex>
      <DataTable
          columns={columnsDatatable} data={tableData} pagination={true} paginationRowsPerPageOptions={[10, 25, 50, 100]}
          customStyles={customStyles}></DataTable>
    </Card>
  )
}
