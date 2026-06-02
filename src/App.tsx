import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/layotus/header';
import Footer from './components/layotus/footer';
import { HomePage } from './pages/homePage';
import ContactPage from './pages/contactoPage';
import ProductPage from './pages/productPage';
import AdminPage from './pages/adminPage';
import ProtectedRoute from './components/layotus/protectedRoute';

function App() {
  return (
    <Router>
      <Header /> 
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/contacto' element={<ContactPage />} />
          <Route path='/producto' element={<ProductPage />} />
          <Route path='/admin' element={
            <ProtectedRoute requiredRole="Admin">
            <AdminPage />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
