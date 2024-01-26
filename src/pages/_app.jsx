import { ConfigProvider as AntdProvider } from 'antd'
import { ThemeProvider } from '@emotion/react'
import { getTheme } from '@/configs/theme'
import ptBR from 'antd/locale/pt_BR'
import '@/styles/index.scss'
import Layout from '@/layout'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import 'react-credit-cards/es/styles-compiled.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const isInHome = router.pathname === '/'

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  const theme = getTheme('red', 'light')

  return (
    <GoogleReCaptchaProvider
      language="pt-BR"
      reCaptchaKey={process.env.RECAPCHA_CHECKOUT_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined
      }}
    >
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <AntdProvider theme={theme} locale={ptBR}>
        <ThemeProvider theme={theme}>
          {isInHome ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </ThemeProvider>
      </AntdProvider>
    </GoogleReCaptchaProvider>
  )
}
