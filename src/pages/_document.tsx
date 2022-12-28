import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html lang='en'>
      <Head>
        <link rel='apple-touch-icon' href='/favicon.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <body id='root'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
