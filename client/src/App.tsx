import './App.css';
import React, { useState } from 'react';
import MainPage from './components/MainPage';
import Profile from './components/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginView from './components/LoginView';
// In your root application component (e.g., App.tsx)
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './components/PaymentForm';

// Wrap your components with Stripe's Elements provider

const App: React.FC = () => {
  const [component, setComponent] = useState(true);
  const [searchText, setSearchText] = useState('');
  const stripePromise = loadStripe(
    'pk_test_51N30rHGF7NYNyMJj7sD45qKrarWZcDRJVaxKsiK4S6kUTgUeGsP8cszeVpftpMrhQi3BJQz10JEsZZjMQakx9eDp00SEEjtMUN'
  );

  const toggleComponent = () => {
    setComponent(!component);
  };
  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <Routes>
          <Route path='/payment' element={<PaymentForm />} />
          <Route path='/login' element={<LoginView />} />
          <Route
            path='/'
            element={
              <>
                {component ? (
                  <MainPage
                    toggleComponent={toggleComponent}
                    searchText={searchText}
                    setSearchText={setSearchText}
                  />
                ) : (
                  <Profile
                    toggleComponent={toggleComponent}
                    setSearchText={setSearchText}
                  />
                )}
                ;
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </Elements>
  );
};

export default App;
