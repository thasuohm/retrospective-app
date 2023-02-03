import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {fiveYearsOldFont, sanamDeklen} from '../config/fonts'
import {ThemeProvider} from '../contexts/theme'
import DefaultLayout from '../components/layouts/DefaultLayout'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
config.autoAddCss = false
import {Hydrate, QueryClient, QueryClientProvider} from 'react-query'
import AuthProvider from '../components/AuthProvider'
import {SocketProvider} from '../contexts/socket'

const queryClient = new QueryClient()
export default function App({Component, pageProps}: AppProps) {
  return (
    <AuthProvider>
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider>
              <ToastContainer
                bodyClassName={`${fiveYearsOldFont.variable} ${sanamDeklen.variable} font-five-yearsold font-semibold`}
              />
              <main
                className={`duration-200 ${fiveYearsOldFont.variable} ${sanamDeklen.variable} font-five-yearsold `}
              >
                <DefaultLayout>
                  <Component {...pageProps} />
                </DefaultLayout>
              </main>
            </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </SocketProvider>
    </AuthProvider>
  )
}
