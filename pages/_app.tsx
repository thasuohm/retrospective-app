import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Script from 'next/script'
import {fiveYearsOldFont} from '../config/fonts'
import {ThemeProvider} from '../contexts/theme'
config.autoAddCss = false

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <ThemeProvider>
        <main
          className={`dark:bg-slate-900 h-screen duration-200 ${fiveYearsOldFont.variable} font-five-yearsold`}
        >
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  )
}
