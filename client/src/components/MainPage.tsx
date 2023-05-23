import React from 'react';
import NavBar from './NavBar';
import FilterBar from './FilterBar';
import './MainPage.css';
import Logo from '../images/Hanger.svg';
import { Button, Modal, Drawer, Space } from 'antd';
import { useState, useEffect } from 'react';
import Register from './Register';
import LoginView from './LoginView';
import Sellitem from './Sellitem';
import { GetAllItemsFunction } from '../apiService';
import Item from './Item';

interface Props {
  toggleComponent: () => void;
  searchText: any;
  setSearchText: any;
}

const MainPage: React.FC<Props> = ({
  toggleComponent,
  searchText,
  setSearchText,
}) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');

  const checkIfUserIsLoggedIn = () => {
    const token = localStorage.getItem('hanger-token');
    const user = localStorage.getItem('hanger-user');

    return token !== null && user !== null;
  };

  const [isLoggedIn, setIsLoggedIn] = useState(checkIfUserIsLoggedIn());
  const [isRegOpen, setIsRegOpen] = useState(!isLoggedIn);

  const toggleLoggedIn = () => {
    setIsLoggedIn(false);
    setIsLoggedIn(checkIfUserIsLoggedIn());
  };

  useEffect(() => {
    GetAllItemsFunction().then((data) => {
      const sortedItems = data.sort((a, b) => {
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      });

      setItems(sortedItems);
    });
  }, []);

  function showRegistration() {
    setIsRegOpen(!isRegOpen);
  }

  const handleCancel = () => {
    setIsRegOpen(false);
    setIsLoginOpen(false);
    setOpen(false);
  };
  // const showDrawer = () => {
  //   console.log("clicked");
  //   setOpen(true);
  // };

  return (
    <div className='main-view '>
      <div className='sticky top-0' style={{ zIndex: 999 }}>
        <NavBar
          toggleComponent={toggleComponent}
          setSearchText={setSearchText}
          isLoggedIn={isLoggedIn}
        />
        <FilterBar setCategoryFilter={setCategoryFilter} />
      </div>
      <div className='Hero'>
        <div className='flex flex-start'>
          <div className='border-2 border-amber-900 rounded-lg bg-white w-96 h-56 ml-40 mt-12 flex flex-col'>
            <h1 className='text-3xl p-4 text-center m-7 '>
              Earn cash for clothes you're not wearing anymore!!
            </h1>
            {/* <button
              onClick={showDrawer}
              className="ring-2 ring-amber-900 bg-amber-900 text-white rounded-md p-1 self-center mt-3 hover:cursor-pointer"
            >
              Sell now!
            </button> */}
          </div>
          <img src={Logo} className='logo-hero' />
        </div>
        <h2 className='text-3xl ml-10 newsfeed'>Newsfeed</h2>
      </div>

      <div className='custom-shape-divider-bottom-1682434773'>
        <svg
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
        >
          <path
            d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
            opacity='.25'
            className='shape-fill'
          ></path>
          <path
            d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'
            opacity='.5'
            className='shape-fill'
          ></path>
          <path
            d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'
            className='shape-fill'
          ></path>
        </svg>
      </div>

      <div className='flex ml-6 mr-6 mt-3 overflow-auto scrollbar'>
        {items
          .filter((item) => item.category.includes(categoryFilter))
          .filter((item) => item.title.includes(searchText))
          .map((item) => (
            <Item key={item._id}  img={item.img} title={item.title}  desc={item.desc} condition={item.condition} category={item.category} price={item.price} size={item.size} />
          ))}
      </div>
      <Modal
        width={'1000px'}
        open={isRegOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Register
          toggleLoggedIn={toggleLoggedIn}
          showRegistration={showRegistration}
        />
      </Modal>
      <>
        <Modal
          width={'800px'}
          open={isLoginOpen}
          onCancel={handleCancel}
          footer={false}
        >
          <LoginView
          // showRegistration={showRegistration}
          // toggleLoggedIn={toggleLoggedIn}
          />
        </Modal>
      </>

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

export default MainPage;
