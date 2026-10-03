import './App.css'
import Home from './Pages/Home'
import { Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from './assets/components/Auth/SignupForm';
import ProductDetails from './assets/components/Product/ProductDetails';
import AllProducts from './assets/components/Product/AllProducts';
import LoginForm from './assets/components/Auth/LoginForm';
import RefreshHandler from './refreshHandler';
import { useState } from 'react';
import Profile from './Pages/Profile';
import ProductListing from './Pages/ProductListing';
import MyOrders from './Pages/MyOrders';
import MySwapRequests from './Pages/MySwapRequests';
import SellerDashboard from './Pages/SellerDashboard';
import HowReWearWorks from './Pages/HowReWearWorks';
import ContactSeller from './Pages/ContactSeller';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<Home />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route path="/all-products" element={<AllProducts />} />
        

        <Route
          path="/profile"
          element={
            <Profile setIsAuthenticated={setIsAuthenticated} />
          }
        />

        <Route
          path="/product-listing"
          element={<ProductListing />}
        />
        <Route path="/my-orders" element={<MyOrders />} />

        <Route
            path="/my-swap-requests"
            element={<MySwapRequests />}
        />

        <Route
              path="/seller-dashboard"
              element={<SellerDashboard />}
        />
        <Route path="/how-rewear-works" element={<HowReWearWorks />} />
        <Route path="/contact-seller/:id" element={<ContactSeller />} />
      </Routes>
    </>
  );
}

export default App;