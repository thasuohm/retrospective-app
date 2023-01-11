import {useContext, createContext, useState, useEffect} from 'react'

interface AppContextInterface {
  theme: string
  setTheme: (state: string) => void
}

const ThemeContext = createContext<
  AppContextInterface | {theme: ''; setTheme: (state: string) => {}}
>({
  theme: '',
  setTheme: (state) => {},
})

export const ThemeProvider = (props: any) => {
  const [theme, setTheme] = useState<string | null>(null)

  useEffect(() => {
    setTheme(theme)
    if (theme) {
      localStorage.theme = theme
    }

    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        setTheme: (state: string) => setTheme(state),
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
