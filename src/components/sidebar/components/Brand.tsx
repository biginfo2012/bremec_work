// Chakra imports
import { Flex, useColorMode, useColorModeValue } from '@chakra-ui/react';
import BremecLogo from '../../../../public/logo-bremec.png';
import WhiteLogo from '../../../../public/logo-bremec-white.png'
import Image from 'next/image'

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('white.500', 'white.500');
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<Flex alignItems='center' flexDirection='column' >
			{/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
			<Image  
				src={colorMode === 'light' ? BremecLogo : WhiteLogo}
				// layout='fill'
				height={colorMode === 'light' ? 57.188 : 44.1}
				width={colorMode === 'light' ? 184 : 176.4}
			/>
			{/* <BremecLogo  /> */}
			<HSeparator mb='20px' mt='20px' />
		</Flex>
	);
}

export default SidebarBrand;
