import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Home';
import PropertyPage from './pages/Property';
import PropertyDetailsPage from './pages/PropertyDetail';
import ContactUsPage from './pages/ContactUs';
import AboutUsPage from './pages/AboutUs';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';
import BlogsPage from './pages/Blogs';
import BlogDetailPage from './pages/BlogDetail';
import DashboardLayout from './layouts/DashboardLayout';
import ProfilePage from './pages/Profile';
import FavoritePropPage from './pages/FavoriteProp';
import AgentPage from './pages/Agents';
import AgentDetailPage from './pages/AgentDetail';
import PropertyCategoryPage from './pages/PropertyCategory';
import GuestRoute from './utils/GuestRoute';


function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language, i18n.dir]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/property' element={<PropertyPage />} />
            <Route path='/agents' element={<AgentPage />} />
            <Route path='/about-us' element={<AboutUsPage />} />
            <Route path='/blogs' element={<BlogsPage />} />
            <Route path='/blogs/:id' element={<BlogDetailPage />} />
            <Route path='/contact-us' element={<ContactUsPage />} />
            <Route path='/property/:id' element={<PropertyDetailsPage />} />
            <Route path='/property-category' element={<PropertyCategoryPage />} />
            <Route path='/agent/:id' element={<AgentDetailPage />} />
            <Route element={<GuestRoute />}>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
            </Route>
        </Route>
        <Route path='/dashboard' element={<DashboardLayout />}>
            <Route path='/dashboard/profile' element={<ProfilePage />} />
            <Route path='/dashboard/favorite' element={<FavoritePropPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
