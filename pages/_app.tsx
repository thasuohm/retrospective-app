import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Script from 'next/script'
import localFont from '@next/font/local'
config.autoAddCss = false

const sanamDeklen = localFont({
  src: '../public/fonts/SanamDeklen_chaya/SanamDeklen_chaya.ttf',
  variable: '--font-sanam-deklen',
})

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Script id="theme-handler">
        {`
         if (
          localStorage.theme === 'dark' ||
          (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
          document.documentElement.classList.add('dark')
          console.log('hello')
        } else {
          document.documentElement.classList.remove('dark')
        }
        `}
      </Script>
      <main
        className={`dark:bg-slate-900 h-screen duration-200  ${sanamDeklen.variable} font-sanam-deklen`}
      >
        <Component {...pageProps} />
      </main>
    </>
  )
}
