import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import React from 'react'
import theme from 'theme/theme'

import 'styles/Fonts.css'
import 'styles/App.css'
import 'styles/Contact.css'
import '@aws-amplify/ui-react/styles.css';

import 'react-calendar/dist/Calendar.css'
import 'styles/MiniCalendar.css'
import Head from 'next/head'

import { withAuthenticator } from '@aws-amplify/ui-react';
// Amplify
import { Amplify, API, Auth, withSSRContext } from 'aws-amplify';
import awsExports from '../aws-exports.js';
import AuthContext from 'contexts/AuthContext.js'

Amplify.configure({ ...awsExports, ssr: true });

function MyApp ({ Component, pageProps}) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>BREMEC ITALIA</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
      </Head>
      <React.StrictMode>
          <Component {...pageProps} />     
      </React.StrictMode>
    </ChakraProvider>
  )
}

export default withAuthenticator(MyApp);
