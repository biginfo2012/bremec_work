import React, {useState,useEffect} from 'react'
import {API, graphqlOperation} from 'aws-amplify'
import {GetSensor, GetSensorStatusColor} from '../api/Sensors'
import {onCreateSensorValue} from '../graphql/subscriptions'

import EfficiencyCard from './card/EfficiencyCard'
import StatusCard  from './card/StatusCard'
import { Container, SkeletonCircle, useColorModeValue, Text } from '@chakra-ui/react'

const SensorScreen = (props) => {

  const [sensor, setSensor] = useState({});
  const [sensorValue, setSensorValue] = useState({});
  const [readyToSubscribe, setReadyToSubscribe] = useState(false);

  const { sensorId, name, growth, value } = props;
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

  const chartStyle = {
    height: 250,
  }
  //fetch sensor
  useEffect(() => {
    const initSensor = async () => {

      // console.log('fetching sensor');

      // try {
      //   const response = await GetSensor(sensorId);

      //   if (response) {
          // setSensor(response);
          // // console.log('sensor retrived');
          // console.log(response)
          setReadyToSubscribe(true);
      //   }
      // }
      // catch (error) {
      //   console.log('error fetching sensor', error);
      // }
    };

    initSensor()

  }, [sensorId]);

  //subscribe to changes in sensor values
  useEffect(() => {

    if (readyToSubscribe) {
      // console.log('start subscription to sensor');

      const subscriber = API.graphql(graphqlOperation(onCreateSensorValue, {sensorId : sensorId})).subscribe({
        next: (response) => {
          //update the sensor's status in state
          if (response.value.data.onCreateSensorValue) {
            
            setSensorValue(response.value.data.onCreateSensorValue)
          }
        },
        error: (error) => {
          console.log('error on sensor subscription', error);
        }
      });

      return () => {
        // console.log('terminating subscription to sensor');
        subscriber.unsubscribe();
      }
    }

  }, [readyToSubscribe, sensorId]);

  return (

    sensorValue.efficiency === undefined ?  
    <>
      <Container centerContent>
        <Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px'>
                Status
        </Text>
        <SkeletonCircle size={20} />
      </Container>
      <Container centerContent>
      <Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px'>
      Efficiency
        </Text>
        <SkeletonCircle size={20} />
      </Container>
    </>   
    :
    <>
      {console.log(sensorValue)}
          <StatusCard name='Status' value={sensorValue.status} />
          <EfficiencyCard name='Efficiency 1' value={sensorValue.efficiency} />
          {sensorValue.efficiency2 === 'N/A' ? <></> : <EfficiencyCard name='Efficiency 2' value={sensorValue.efficiency2} />}
    </>
  );
};



export default SensorScreen;
