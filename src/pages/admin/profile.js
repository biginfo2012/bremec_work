import React, { useState, useEffect } from 'react';
// Chakra imports
import { Box, Button, Checkbox, Flex, FormControl, FormHelperText, FormLabel, Grid, Heading, Icon, Input, InputGroup, InputRightElement, Link } from '@chakra-ui/react'
import AdminLayout from 'layouts/admin'

// Custom components
import Banner from 'views/admin/profile/components/Banner'


import { Auth, API, withSSRContext } from 'aws-amplify';
import { listSensorDefs, updateSensorDefs } from 'graphql/queries';


export async function getServerSideProps({req, res}) {
  const {API, Auth} = withSSRContext({req})
  try {
    console.log("getServerSideProps")
    const user = await Auth.currentAuthenticatedUser();
    console.log(user.attributes.email)
    const email = user.attributes.email;
    let filter = {
      Email: {
          eq: email
      }
  }
    const response = await API.graphql({
      query: listSensorDefs,
      variables: {
        limit: 10,
        filter: filter
    }
    });
    console.log(response)
    
    if (response.data.listSensorDefs) {
      const UserData = response.data.listSensorDefs.items[0];
       console.log(UserData)
      return {
        props: {
            data: UserData
        },
    }
    }
  } catch (error) {
    console.log(error)
  }
}

async function getUserData(){
  try {
    const user = await Auth.currentAuthenticatedUser();
    const email = user.attributes.email;
    const response = await API.graphql({
      query: listSensorDefs,
      variables: {email: email},
    });
    if (response.data.listSensorDefs) {
      const SensorData = response.data.listSensorDefs.items;
      console.log(SensorData)
      return SensorData;
    }
  } catch (error) {
    console.log(error)
  }
}



export default function ProfileOverview (props) {
  console.log(props.data.CompanyName)
  const [id, setId] = useState(props.data.id)
  const [companyName, setCompanyName] = useState(props.data.CompanyName)
  const [email, setEmail] = useState(props.data.Email)
  const [piva, setPiva] = useState(props.data.P_IVA)
  const [sdi, setSdi] = useState(props.data.SDI)
  const [phoneNumber, setPhoneNumber] = useState(props.data.PhoneNumber)
  const [pecEmail, setPecEmail] = useState(props.data.PECEmail)
  const [regCountry, setRegCountry] = useState(props.data.RegisteredCountry)
  const [regCity, setRegCity] = useState( props.data.RegisteredCity)
  const [regAddress, setRegAddress] = useState(props.data.RegisteredAddress)
  const [regZipCode, setRegZipCode] = useState( props.data.RegisteredZipCode)
  const [operCountry, setOperCountry] = useState(props.data.OperativeCountry)
  const [operCity, setOperCity] = useState( props.data.OperativeCity)
  const [operAddress, setOperAddress] = useState( props.data.OperativeAddress)
  const [operZipCode, setOperZipCode] = useState( props.data.OperativeZipCode)

  async function updateUserData(){
    const userDetails = {
      id: id,
      CompanyName: companyName,
      Email: email,
      P_IVA: piva,
      SDI: sdi,
      PhoneNumber: phoneNumber,
      PECEmail: pecEmail,
      RegisteredCountry: regCountry,
      RegisteredCity: regCity,
      RegisteredAddress: regAddress,
      RegisteredZipCode: regZipCode,
      OperativeCountry: operCountry,
      OperativeCity: operCity,
      OperativeAddress: operAddress,
      OperativeZipCode: operZipCode
    };
    console.log(userDetails)
    try {
      const updatedUser = await API.graphql({ query: updateSensorDefs, variables: {input: userDetails}});
    } catch (error) {
      console.log(error)
    }
  }


  async function setState(e){
    const data = await getUserData();
    console.log(data);
      setId(data[0].id)
      setCompanyName(data[0].CompanyName)
      setEmail(data[0].Email)
      setPiva(data[0].P_IVA)
      setSdi(data[0].SDI)
      setPhoneNumber(data[0].PhoneNumber)
      setPecEmail(data[0].PECEmail)
      setRegCountry(data[0].RegisteredCountry)
      setRegCity(data[0].RegisteredCity)
      setRegAddress(data[0].RegisteredAddress)
      setRegZipCode(data[0].RegisteredZipCode)
      setOperCountry(data[0].OperativeCountry)
      setOperCity(data[0].OperativeCity)
      setOperAddress(data[0].OperativeAddress)
      setOperZipCode(data[0].OperativeZipCode)
  }


  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        {/* Main Fields */}
        <Grid
          templateColumns={{
            base: '1fr'
          }}
          templateRows={{
            base: '1fr'
          }}
          gap={{ base: '20px', xl: '20px' }}
        >
          <Banner
            name={companyName}
            email={email}
            piva={piva}
            sdi={sdi}
            phoneNumber={phoneNumber}
            pecEmail={pecEmail}
            regCountry={regCountry}
            regCity={regCity}
            regAddress={regAddress}
            regZipCode={regZipCode}
            operCountry={operCountry}
            operCity={operCity}
            operAddress={operAddress}
            operZipCode={operZipCode}
            onChangeHandler={setState}
            onSubmitHandler={updateUserData}
          />
              

    
          {/* <Storage
            gridArea={{ base: '2 / 1 / 3 / 2', lg: '1 / 2 / 2 / 3' }}
            used={25.6}
            total={50}
          /> */}
          {/* <Upload
            gridArea={{
              base: '3 / 1 / 4 / 2',
              lg: '1 / 3 / 2 / 4'
            }}
            minH={{ base: 'auto', lg: '420px', '2xl': '365px' }}
            pe='20px'
            pb={{ base: '100px', lg: '20px' }}
          /> */}
        </Grid>
        {/* <Grid
          mb='20px'
          templateColumns={{
            base: '1fr',
            lg: 'repeat(2, 1fr)',
            '2xl': '1.34fr 1.62fr 1fr'
          }}
          templateRows={{
            base: '1fr',
            lg: 'repeat(2, 1fr)',
            '2xl': '1fr'
          }}
          gap={{ base: '20px', xl: '20px' }}
        > */}
          {/* <Projects
            banner={banner}
            avatar={avatar}
            name='Adela Parkson'
            job='Product Designer'
            posts='17'
            followers='9.7k'
            following='274'
          /> */}
          {/* <General
            gridArea={{ base: '2 / 1 / 3 / 2', lg: '1 / 2 / 2 / 3' }}
            minH='365px'
            pe='20px'
          /> */}
          {/* <Notifications
            used={25.6}
            total={50}
            gridArea={{
              base: '3 / 1 / 4 / 2',
              lg: '2 / 1 / 3 / 3',
              '2xl': '1 / 3 / 2 / 4'
            }}
          /> */}
        {/* </Grid> */}
      </Box>
    </AdminLayout>
  )
}
