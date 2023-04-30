import React from 'react';
import './LoginView.css';
import { Input, Card, Typography, Button } from '@material-tailwind/react';
import { useState } from 'react';
import { RegisterFunction } from '../apiService';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export let newUser;
interface RegisterProps {
  toggleLoggedIn: () => void;
  showRegistration: () => void;
}
const Register: React.FC<RegisterProps> = ({
  toggleLoggedIn,
  showRegistration,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await RegisterFunction({ name, userName, email, password }, navigate);
      info();
    } catch (error) {
      console.log(error);
    }
  };
  toggleLoggedIn();
  showRegistration();

  const info = () => {
    messageApi.info(`Hello! Your account is ready!`);
  };

  return (
    <div className='view2'>
      <div className='flex justify-center items-center pt-24 pb-30'>
        <div className='login-box border border-black flex flex-col items-center'>
          <h1 className='mt-10 text-6xl mb-10'>Hi there 🖖🏻</h1>
          <Card color='transparent' shadow={false}>
            <Typography color='gray' className='mt-1 font-normal'>
              Enter your details to register.
            </Typography>
            <form
              className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
              onSubmit={onSubmit}
            >
              <div className='mb-4 flex flex-col gap-6'>
                <Input
                  size='lg'
                  label='Name'
                  className='bg-white'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  size='lg'
                  label='Userame'
                  className='bg-white'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Input
                  size='lg'
                  label='Email'
                  className='bg-white'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type='password'
                  size='lg'
                  label='Password'
                  className='bg-white'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <a>
                {contextHolder}
                <Button className='mt-6 bg-green-900' fullWidth>
                  Register
                </Button>
              </a>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
