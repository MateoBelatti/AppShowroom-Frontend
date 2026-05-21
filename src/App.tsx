import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/layotus/header';
import Footer from './components/layotus/footer';
import { HomePage } from './pages/homePage';

function App() {
  return (
    <Router>
      <Header /> 
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
