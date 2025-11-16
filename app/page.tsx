import CommitsContainer from '@/components/commits/CommitsContainer'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Header />
        <CommitsContainer />
        <Footer />
      </div>
    </div>
  )
}
export default Home;
