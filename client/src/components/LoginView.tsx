import React, { useEffect, useState } from 'react';
import './LoginView.css';
import Logo from '../images/Hanger.svg';
import { LoginFunction } from '../apiService';
import { Link, useNavigate } from 'react-router-dom';

interface RegisterProps {
  // showRegistration: () => void;
  // toggleLoggedIn: () => void;
}
const LoginView: React.FC<RegisterProps> = (
  {
    // showRegistration,
    // toggleLoggedIn,
  }
) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onClick = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      await LoginFunction({ email, password }, navigate);
      // console.log({ name, userName, email, password });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (
      localStorage.getItem('hanger-user') &&
      localStorage.getItem('hanger-token')
    ) {
      navigate('/');
    }
  });

  return (
    <div className='view'>
      <div className='flex justify-center items-center pt-24 pb-30'>
        <div className='login-box border border-black flex flex-col items-center justify-between'>
          <h1 className='mt-10 text-6xl'>Welcome</h1>
          <img src={Logo} className='w-72 h-72 z-0 absolute mt-20' />
          <div className=' flex flex-col mb-20 '>
            <label>
              <p>Please Login:</p>
            </label>
            <div className='flex flex-row mt-10 w-96 '>
              <label> E-mail:</label>
              <input
                type='text'
                className='border border-black rounded-lg ml-[57px]'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='flex flex-row mt-5 w-96'>
              <label>Password:</label>
              <input
                type='password'
                className='border border-black rounded-lg ml-8'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className=' rounded-lg mt-5 bg-amber-900 text-white text-center'
              onClick={onClick}
            >
              Login
            </button>
            <p className='flex justify-center'>
              Dont have an account? Register
              <Link to={'/'}>
                <a>here 🎯</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
