import React, {useEffect} from 'react'

// Chakra imports
import {
  Box,
  Flex,
  Grid,
} from '@chakra-ui/react'

import {
  MdAddTask,
} from 'react-icons/md'

// Custom components
import MachineCard from 'components/card/MachineCard'
// Assets
import AdminLayout from 'layouts/admin'

import { Amplify, withSSRContext } from 'aws-amplify';
import {sensorsByEmail} from '../../graphql/queries'

export async function getServerSideProps({req, res}) {
  const {Auth, API} = withSSRContext({req});
  try {
      const user = await Auth.currentAuthenticatedUser();
      const response = await API.graphql({
          query: sensorsByEmail,
          variables: {Email: user.attributes.email},
          limit: 1,
      });

      if (response.data.sensorsByEmail) {

        const SensorData = response.data.sensorsByEmail.items;
 
          return {
              props: {
                  sensorData: SensorData,
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


export default function Machines (props) {

  const sensors = props.sensorData;

  useEffect(() => {
    // 👇️ use document.getElementById()
    const el = document.getElementById('companyName');
    console.log(el);

  }, []);


  return (
    <AdminLayout>
      <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
        {console.log(sensors)}
        <Grid
          mb='20px'
          // gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
          gap={{ base: '20px', xl: '20px' }}
          display={{ base: 'block', xl: 'grid' }}
        >
            <Flex direction='column'>
              {sensors.map(sensor => {
                return (
                  <MachineCard 
                    key={sensor.SensorName} 
                    sensorId={sensor.SensorName}
                    name={sensor.SensorFriendlyName}
                  />
                )
              })}
                
            </Flex>
                
        </Grid>
      </Box>
    </AdminLayout>
  )
}
