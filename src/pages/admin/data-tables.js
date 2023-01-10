import { Box, SimpleGrid } from '@chakra-ui/react'
import DevelopmentTable from 'views/admin/dataTables/components/DevelopmentTable'
import { API } from 'aws-amplify'
import { columnsDataDevelopment } from 'views/admin/dataTables/variables/columnsData'
import React, { useState } from 'react'
import AdminLayout from 'layouts/admin'
import { Amplify, withSSRContext } from 'aws-amplify'
import {listSensorValues, sensorsByEmail} from '../../graphql/queries'
import { useRouter } from 'next/router'

export async function getServerSideProps({req, res}) {
    const {API, Auth} = withSSRContext({req})
    try {

        const user = await Auth.currentAuthenticatedUser()
        const responseSensors = await API.graphql({
            query: sensorsByEmail,
            variables: {Email: user.attributes.email},
            limit: 1,
        })

        //for get first censor's data
        let sensorData = responseSensors.data.sensorsByEmail.items
        let response
        if (sensorData.length > 0) {
            let filter = {
                sensorId: {
                    eq: sensorData[0].SensorName
                }
            }
            response = await API.graphql({
                query: listSensorValues,
                variables: {
                    limit: 10000,
                    filter: filter
                }
            })
        } else {
            //List of all sensor values for a specific sensor ID
            response = await API.graphql({
                query: listSensorValues,
                limit: 2,
            })
        }


        if (response.data.listSensorValues && responseSensors.data.sensorsByEmail) {
            const SensorData = response.data.listSensorValues.items
            const SensorList = responseSensors.data.sensorsByEmail.items
            return {
                props: {
                    sensorData: SensorData,
                    sensorList: SensorList,
                    mode: "VIEW",
                    error: false,
                },
            }
        } else {
            return {
                props: {
                    mode: "ADD",
                    error: false,
                },
            }
        }
    } catch (err) {
        console.log(err)
        return {
            props: {
                error: true,
            },
        }
    }
}

export default function DataTables (props) {
    const router = useRouter()
    const [sensorData, setSensorData] = useState([])
    const [sensorName, setSensorName] = useState(props.sensorList != null && props.sensorList.length > 0 ? props.sensorList[0].SensorFriendlyName : "")

    async function updateSensorData(sensorID){
        let filter = {
            sensorId: {
                eq: sensorID
            }
        }
        const response = await API.graphql({
            query: listSensorValues,
            variables: {
                limit: 10000,
                filter: filter
            }
        })
        setSensorData(response.data.listSensorValues.items)
        return response
    }

    const updateSensor = (e) => {
        let sensorID = e.target.id
        let SensorFriendlyName = e.target.innerHTML
        updateSensorData(sensorID)
        router.replace(router.asPath)
        setSensorName(SensorFriendlyName)
        return sensorID
    }

    //if no sensorData load props.sensorData
    if(sensorData != null && !sensorData.length){
        setSensorData(props.sensorData)
    }

    return (
        <AdminLayout>
            <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
                <SimpleGrid
                    mb='20px'
                    columns={{ sm: 1 }}
                    spacing={{ base: '20px', xl: '20px' }}
                >
                    <DevelopmentTable
                        sensorList={props.sensorList}
                        columnsData={columnsDataDevelopment}
                        tableData={(sensorData)}
                        handler={updateSensor}
                        sensorName={sensorName}
                    />
                </SimpleGrid>
            </Box>
        </AdminLayout>
    )
}
