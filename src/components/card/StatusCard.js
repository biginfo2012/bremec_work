import { Text, Icon, SimpleGrid, useColorModeValue,
    CircularProgress, CircularProgressLabel, Container} from '@chakra-ui/react';

export default function StatusCard(props){

    const { startContent, endContent, name, growth, value } = props;
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

	const textColorSecondary = 'secondaryGray.600';

    return(
        <Container centerContent>
            <Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px'>
                {name}
            </Text>
            <Container centerContent>
            <Icon viewBox='0 0 200 200' color={props.value > 0 ? 'green.500' : 'red.500'} boxSize={100}>
                <path
                    fill='currentColor'
                    d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                />
            </Icon>
            </Container>
        </Container>
    )

}