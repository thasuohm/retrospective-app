import {DefaultLayoutType} from '../../types/layouts'
import Footer from '../Footer'
import NavBar from '../NavBar'
import ThemeRise from '../ThemeRise'

const DefaultLayout: React.FC<DefaultLayoutType> = ({children}) => {
  return (
    <>
      <NavBar />
      <ThemeRise />
      <section className="max-w-5xl w-full mx-auto relative h-screen mb-8">
        {children}
      </section>
      <Footer />
    </>
  )
}

export default DefaultLayout
