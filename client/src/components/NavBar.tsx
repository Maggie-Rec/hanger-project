import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { faCommentDollar } from '@fortawesome/free-solid-svg-icons';
import Logo from '../images/Hanger.svg';
import { Button, Drawer, Space } from 'antd';
import { useState } from 'react';
import Sellitem from './Sellitem';
import { Link, useNavigate } from 'react-router-dom';

interface ItemProps {
  setSearchText: any;
  toggleComponent: () => void;
  isLoggedIn: boolean;
}

const NavBar: React.FC<ItemProps> = ({
  toggleComponent,
  setSearchText,
  isLoggedIn,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleCancel = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <div className='flex justify-between bg-white'>
      <a onClick={toggleComponent}>
        <img src={Logo} className='w-24 h-24 ml-8' />
      </a>
      <form className='ml-14'>
        <input
          type='text'
          className='px-60 py-4 m-2 mt-4 rounded-full form-input ring-2 ring-amber-900'
          placeholder='Search'
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
      <div className='m-2 flex'>
        {isLoggedIn && (
          <a onClick={toggleComponent}>
            <FontAwesomeIcon
              icon={faUserAstronaut}
              className='p-4 mt-2 mr-9 text-2xl hover:cursor-pointer'
            />
          </a>
        )}

        {/* <Link to='/payment'>
          <FontAwesomeIcon
            icon={faCommentDollar}
            className='notification p-4 mt-2 mr-9 text-2xl '
          />
        </Link> */}

        {/* notification icon here
      (with state if new message)  */}
      </div>
      {isLoggedIn ? (
        <a
          onClick={() => {
            localStorage.removeItem('hanger-user');
            localStorage.removeItem('hanger-token');
            navigate('/login');
          }}
          className='ring-2 ring-amber-900 bg-amber-900 text-white rounded-md p-1 self-center mr-12 hover:cursor-pointer text-center'
        >
          <Link to='/'>Log Out</Link>
        </a>
      ) : (
        <Link
          to='/login'
          className='ring-2 ring-amber-900 bg-amber-900 text-white rounded-md p-1 self-center mr-12 hover:cursor-pointer text-center'
        >
          Login
        </Link>
      )}
      {isLoggedIn && (
        <a
          onClick={showDrawer}
          className='ring-2 ring-amber-900 bg-amber-900 text-white rounded-md p-1 self-center mr-12 hover:cursor-pointer text-center'
        >
          Sell Now
        </a>
      )}

      <Drawer
        title='Add Item'
        width={520}
        onClose={handleCancel}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
          </Space>
        }
      >
        <Sellitem />
      </Drawer>
    </div>
  );
};

export default NavBar;
