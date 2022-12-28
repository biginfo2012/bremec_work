/* eslint-disable */
import {
  Flex,
  Icon,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue
} from '@chakra-ui/react'
// Custom components
import Card from 'components/card/Card'
import { MdCheckCircle, MdCancel, MdOutlineError } from 'react-icons/md'
import Menu from 'components/menu/MainMenu'
import React, { useEffect, useMemo, useState } from 'react'
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable
} from 'react-table'

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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState
  } = tableInstance
  initialState.pageSize = 12

  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const iconColor = useColorModeValue('secondaryGray.500', 'white')
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')

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
        {console.log(sensors)}
        <Menu 
          sensorList={sensors}
          handler={props.handler}
        />
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color='gray.400'
                  >
                    {column.render('Header')}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            // console.log(row)
            prepareRow(row)

            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  // console.log(cell)
                  let data
                  if (cell.column.Header === 'SENSOR') {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    )
                  } else if (cell.column.Header === 'STATUS') {
                    data = (
                      <Flex align='center'>
                        <Icon
                          w='24px'
                          h='24px'
                          me='5px'
                          color={
                            cell.value >0 ? 'green.500' : 'red.500'
                              // ? 'red.500'
                              // : cell.value === 'Error'
                              // ? 'orange.500'
                              // : null
                          }
                          as={
                            cell.value > 0 ? MdCheckCircle : MdCancel
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
                  }else if (cell.column.Header === 'TIMESTAMP') {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    )
                  } else if (cell.column.Header === 'EFFICIENCY') {
                    data = (
                      <Flex align='center'>
                        <Text
                          me='10px'
                          color={textColor}
                          fontSize='sm'
                          fontWeight='700'
                        >
                          {Math.trunc(cell.value)}%
                        </Text>
                        <Progress
                          variant='table'
                          colorScheme='brandScheme'
                          h='8px'
                          w='63px'
                          value={cell.value}
                        />
                      </Flex>
                    )
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor='transparent'
                    >
                      {data}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Card>
  )
}
