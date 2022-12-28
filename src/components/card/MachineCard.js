// Chakra imports
import { Text, SimpleGrid, useColorModeValue, Flex,
			CircularProgress, CircularProgressLabel, Container} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import SensorScreen from 'components/SensorScreen';
import EfficiencyCard from './EfficiencyCard';

export default function Default(props) {
	const { sensorId, name, growth, value } = props;
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

	const textColor = useColorModeValue('secondaryGray.900', 'white')
	const textColorSecondary = 'secondaryGray.600';

	return (
		<>
			<Flex
			mt='45px'
			mb='20px'
			justifyContent='space-between'
			direction={{ base: 'column', md: 'row' }}
			align={{ base: 'start', md: 'center' }}
			>
			<Text
				color={textColor}
				fontSize='2xl'
				ms='24px'
				fontWeight='700'
			>
				{name}
			</Text>
			</Flex>
			<SimpleGrid>   
				<Card >
					<SimpleGrid minChildWidth='120px' spacing='20px'>
						<SensorScreen sensorId={sensorId}/>
					</SimpleGrid>
				</Card>
			</SimpleGrid>
		</>
	);
}
