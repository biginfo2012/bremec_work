import { Box, SimpleGrid } from '@chakra-ui/react'
import DevelopmentTable from 'views/admin/dataTables/components/DevelopmentTable'
import { API } from 'aws-amplify';
import {
  columnsDataDevelopment,
} from 'views/admin/dataTables/variables/columnsData'
import tableDataDevelopment from 'views/admin/dataTables/variables/tableDataDevelopment.json'
import React, { useState } from 'react'
import AdminLayout from 'layouts/admin'
import { TableData } from 'views/admin/default/variables/columnsData'


import { Amplify, withSSRContext } from 'aws-amplify';
import {listSensorValues, sensorsByEmail} from '../../graphql/queries'

import { useRouter } from 'next/router';


export async function getServerSideProps({req, res}) {
  const {API, Auth} = withSSRContext({req});
  try {

    const user = await Auth.currentAuthenticatedUser();
    const responseSensors = await API.graphql({
        query: sensorsByEmail,
        variables: {Email: user.attributes.email},
        limit: 1,
    });

      // List of all sensor values for a specific sensor ID
      const response = await API.graphql({
          query: listSensorValues,
          limit: 2,
      });


      
      if (response.data.listSensorValues && responseSensors.data.sensorsByEmail) {
        const SensorData = response.data.listSensorValues.items;
        const SensorList = responseSensors.data.sensorsByEmail.items;
        
          return {
              props: {
                  sensorData: SensorData,
                  sensorList: SensorList,
                  mode: "VIEW",
                  error: false,
              },
          };
      } else {
          return {
              props: {
                  mode: "ADD",
                  error: false,
              },
          };
      }
  } catch (err) {
      console.log(err);
      return {
          props: {
              error: true,
          },
      };
  }
}


export default function DataTables (props) {
  const router = useRouter();
  const [sensorData, setSensorData] = useState([])
  const [sensorName, setSensorName] = useState("")

  async function updateSensorData(sensorID){
    let filter = {
      sensorId: {
          eq: sensorID
      }
    };
    const response = await API.graphql({
      query: listSensorValues,
      variables: {
        limit: 100,
        filter: filter
        }
    });
    setSensorData(response.data.listSensorValues.items)
    console.log(response.data.listSensorValues.items)
    return response
  }

  const updateSensor = (e) => {
    let sensorID = e.target.id;
    console.log(sensorID)
    updateSensorData(sensorID)
    router.replace(router.asPath);
    setSensorName(sensorID)
    return sensorID
  }

  {console.log(sensorData)}
  //if no sensorData load props.sensorData
  if(!sensorData.length){
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
