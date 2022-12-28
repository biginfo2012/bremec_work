import { Text, SimpleGrid, useColorModeValue,
    CircularProgress, CircularProgressLabel, Container} from '@chakra-ui/react';

export default function EfficiencyCard(props){

    const { startContent, endContent, name, growth, value } = props;
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

	const textColorSecondary = 'secondaryGray.600';
    const sensorValue = Math.trunc(value);

    return(
        <Container centerContent>
            <Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px'>
                {name}
            </Text>
            <Container centerContent>

                <CircularProgress 
                    value={sensorValue} 
                    color='green.400'
                    size='100px'
                    thickness='14px'
                >
                <CircularProgressLabel>{sensorValue}%</CircularProgressLabel>
                </CircularProgress>

            </Container>
        </Container>
    )

}