import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {fiveYearsOldFont, sanamDeklen} from '../config/fonts'
import {ThemeProvider} from '../contexts/theme'
import DefaultLayout from '../components/layouts/DefaultLayout'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from '../components/Footer'
config.autoAddCss = false
import {QueryClient, QueryClientProvider} from 'react-query'
import AuthProvider from '../components/AuthProvider'

export default function App({Component, pageProps}: AppProps) {
  const queryClient = new QueryClient()

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ToastContainer
            bodyClassName={`${fiveYearsOldFont.variable} font-five-yearsold font-semibold`}
          />
          <main
            className={`bg-white dark:bg-slate-900 h-screen duration-200 ${fiveYearsOldFont.variable} ${sanamDeklen.variable} font-five-yearsold`}
          >
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
            <Footer />
          </main>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}
