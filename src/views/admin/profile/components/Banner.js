// Chakra imports
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, InputRightElement, Link, Text, useColorModeValue } from '@chakra-ui/react'
import Card from 'components/card/Card'
import { NextAvatar } from 'components/image/Avatar'
import { HSeparator } from 'components/separator/Separator'

export default function Banner (props) {
  const {
    name,
    email,
    piva,
    sdi,
    phoneNumber,
    pecEmail,
    regCountry,
    regCity,
    regAddress,
    regZipCode,
    operCountry,
    operCity,
    operAddress,
    operZipCode,
    onChangeHandler,
    onSubmitHandler,
    ...rest
  } = props
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = 'gray.400'
  const borderColor = useColorModeValue(
    'white !important',
    '#111C44 !important'
  )
  return (
    <Card mb={{ base: '0px', lg: '20px' }} alignItems='center' {...rest}>
      <Box
        bgSize='cover'
        borderRadius='16px'
        h='131px'
        w='100%'
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='3xl' mt='10px'>
        {email}
      </Text>
      <Flex w={'50%'} mx='auto' mt='26px'>
        <FormControl>
          <FormLabel display='flex' ms='4px' fontSize='lg' fontWeight='500'  mb='8px'>
            Company Name
          </FormLabel>
          <Input
            isRequired={true}
            variant='outline'
            fontSize='md'
            ms={{ base: '0px', md: '0px' }}
            placeholder='Company Name'
            mb='24px'
            fontWeight='500'
            size='lg'
            defaultValue={name}
            onChange={onChangeHandler}
          />
          <FormLabel display='flex' ms='4px' fontSize='lg' fontWeight='500'  mb='8px'>
            P.IVA
          </FormLabel>
          <Input
            variant='outline'
            fontSize='md'
            ms={{ base: '0px', md: '0px' }}
            placeholder='P.IVA'
            mb='24px'
            fontWeight='500'
            size='lg'
            defaultValue={piva}
            onChange={onChangeHandler}
          />
          <FormLabel display='flex' ms='4px' fontSize='lg' fontWeight='500'  mb='8px'>
            SDI
          </FormLabel>
          <Input
            variant='outline'
            fontSize='md'
            ms={{ base: '0px', md: '0px' }}
            placeholder='SDI'
            mb='24px'
            fontWeight='500'
            size='lg'
            value={sdi}
            onChange={onChangeHandler}
          />
          <FormLabel display='flex' ms='4px' fontSize='lg' fontWeight='500'  mb='8px'>
            Phone Number
          </FormLabel>
          <Input
            variant='outline'
            fontSize='md'
            ms={{ base: '0px', md: '0px' }}
            placeholder='Phone Number'
            mb='24px'
            fontWeight='500'
            size='lg'
            value={phoneNumber}
            onChange={onChangeHandler}
          />
          <FormLabel display='flex' ms='4px' fontSize='lg' fontWeight='500'  mb='8px'>
            PEC Email
          </FormLabel>
          <Input
            variant='outline'
            fontSize='md'
            ms={{ base: '0px', md: '0px' }}
            placeholder='PEC Email'
            mb='24px'
            fontWeight='500'
            size='lg'
            value={pecEmail}
            onChange={onChangeHandler}
          />
          <Flex align='center' mb='25px'>
						<HSeparator />
						<Text  mx='34px' w={'50%'} fontSize='lg'>
                Registered Office
						</Text>
						<HSeparator />
					</Flex>
            <FormLabel ms='4px' fontSize='lg' fontWeight='500'  display='flex'>
              Country
            </FormLabel>
            <Input
              fontSize='md'
              placeholder='Country'
              mb='24px'
              variant='outline'
              value={regCountry}
              onChange={onChangeHandler}
            />
          <FormLabel ms='4px' fontSize='lg' fontWeight='500'  display='flex'>
            City
          </FormLabel>
            <Input
              fontSize='md'
              placeholder='City'
              mb='24px'
              variant='outline'
              value={regCity}
              onChange={onChangeHandler}
            />
          <FormLabel ms='4px' fontSize='lg' fontWeight='500'  display='flex'>
            Address
          </FormLabel>
            <Input
              fontSize='md'
              placeholder='Address'
              mb='24px'
              variant='outline'
              value={regAddress}
              onChange={onChangeHandler}
            />
          <FormLabel ms='4px' fontSize='lg' fontWeight='500'  display='flex'>
            Zip Code
          </FormLabel>
            <Input
              fontSize='md'
              placeholder='Zip Code'
              mb='24px'
              variant='outline'
              value={regZipCode}
              onChange={onChangeHandler}
            />
          <Flex align='center' mb='25px'>
						<HSeparator />
						<Text  mx='34px' w={'50%'} fontSize='lg'>
                Operative Office
						</Text>
						<HSeparator />
					</Flex>
          <FormLabel ms='4px' fontSize='lg' fontWeight='500'  display='flex'>
              Country
            </FormLabel>
            <Input
              fontSize='md'
              placeholder='Country'
              mb='24px'
              variant='outline'
              value={operCountry}
              onChange={onChangeHandler}
            />
          <FormLabel ms='4px' fontSize='lg' fontWeight='500'  display='flex'>
            City
          </FormLabel>
            <Input
              fontSize='md'
              placeholder='City'
              mb='24px'
              variant='outline'
              value={operCity}
              onChange={onChangeHandler}
            />
          <FormLabel ms='4px' fontSize='lg' fontWeight='500'  display='flex'>
            Address
          </FormLabel>
            <Input
              fontSize='md'
              placeholder='Address'
              mb='24px'
              variant='outline'
              value={operAddress}
              onChange={onChangeHandler}
            />
          <FormLabel ms='4px' fontSize='lg' fontWeight='500'  display='flex'>
            Zip Code
          </FormLabel>
            <Input
              fontSize='md'
              placeholder='Zip Code'
              mb='24px'
              variant='outline'
              value={operZipCode}
              onChange={onChangeHandler}
            />
          <Button onClick={onSubmitHandler} fontSize='md' variant='brand' fontWeight='500' w='100%' h='50' mb='24px'>
            Save
          </Button>
        </FormControl>
      </Flex>
    </Card>
  )
}
