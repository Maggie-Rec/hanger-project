import React, { useState } from 'react';
import { Popover, Drawer, Form, Input, Button, notification, Space } from 'antd';
import { ItemInterface } from '../interfaces/item';
import PaymentForm from './PaymentForm';
import { EditItemFunction, DeleteItemFunction } from "../apiService";
import { async } from "q";
import EditItem from "./EditItem";
import Sellitem from "./Sellitem";

interface CartItem {
  _id: string;
  title: string;
  price: number;
}

interface ItemProps extends ItemInterface {
  profileView?: boolean;
}

const Item: React.FC<ItemProps> = ({
  _id,
  img,
  title,
  desc,
  category,
  condition,
  price,
  size,
  user,
  profileView
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    postalCode: '',
    city: '',
    country: '',
  });

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const addToCart = () => {
    const newCartItem = {
      _id: _id,
      title: title,
      price: price,
    };
    setCartItems([...cartItems, newCartItem]);
    notification.success({
      message: 'Item added to cart',
      description: `${title} has been added to your cart.`,
    });
    showDrawer();
  };

  const removeFromCart = (_id: string) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== _id);
    setCartItems(updatedCartItems);
  };

  const calculateTotalPrice = (): number => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleBuy = () => {
    // send cartItems and shippingInfo to server
    console.log(cartItems, shippingInfo);
    setCartItems([]);
    onClose();
    notification.success({
      message: 'Purchase completed',
      description: `Your purchase has been completed successfully.`,
    });
  };

  const deleteItem = async () => {
    await DeleteItemFunction(_id);
  }

  const handleCancel = () => {
    setOpen(false);
  };

  const showEditDrawer = () => {
    setOpen(true);
  };

  const content = (
    <div className='flex flex-col items-start w-60'>
      <p className='font-bold'>{title}</p>
      <p className='text-center'>{desc}</p>
      <p className='font-bold'>£{price}</p>
      <h4>
        <span className='font-bold'>size:</span> {size}
      </h4>
      <p>
        <span className='font-bold'>condition:</span> {condition}
      </p>
      <div className="flex justify-center items-center space-x-3 mt-3 w-full">
        {profileView ? (
          <>
            <button
              onClick={showEditDrawer}
              className="ring-2 ring-green-500 bg-green-500 text-white rounded-md p-1 self-center mt-3 hover:cursor-pointer"
            >
              EDIT
            </button>
            <button
              onClick={deleteItem}
              className="ring-2 ring-red-500 bg-red-500 text-white rounded-md p-1 self-center mt-3 hover:cursor-pointer"
            >
              DELETE
            </button>
          </>
        ) : (
          <button
            onClick={addToCart}
            className='ring-2 ring-amber-900 bg-amber-900 text-white rounded-md p-1 self-center mt-3 hover:cursor-pointer'
          >
            ADD TO CART
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Popover content={content} title='Item Description'>
        <div
          className='flex flex-col items-center '
          style={{ minWidth: '250px' }}
        >
          <img
            src={img}
            className='h-72 rounded-xl m-4  p-2 hover:shadow-2xl transition-shadow'
          />
          <h1>{title}</h1>
          <p>£{price}</p>
          <p>size: {size}</p>
        </div>
      </Popover>
      <Drawer
        title='Edit Item'
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
        <EditItem _id={_id} img={img} title={title} desc={desc} condition={condition} category={category} price={price} size={size} />
      </Drawer>
      <Drawer
        title='Checkout'
        open={drawerVisible}
        onClose={() => {
          setCartItems([]);
          setDrawerVisible(false);
        }}
        width={400}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleBuy} type='primary'>
              Buy
            </Button>
          </div>
        }
      >
        <h2>Shopping Cart</h2>
        <div style={{ marginBottom: '1rem' }}>
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}
            >
              <div>{item.title}</div>
              <div>£{item.price}</div>
              <Button onClick={() => removeFromCart(item._id)} type='link'>
                Remove
              </Button>
            </div>
          ))}
        </div>
        <div>
          <p>
            Total: <strong>£{calculateTotalPrice()}</strong>
          </p>
        </div>
        <h2>Shipping Information</h2>
        <Form layout='vertical'>
          <Form.Item label='Address'>
            <Input
              name='address'
              value={shippingInfo.address}
              onChange={handleShippingInfoChange}
            />
          </Form.Item>
          <Form.Item label='Postal Code'>
            <Input
              name='postalCode'
              value={shippingInfo.postalCode}
              onChange={handleShippingInfoChange}
            />
          </Form.Item>
          <Form.Item label='City'>
            <Input
              name='city'
              value={shippingInfo.city}
              onChange={handleShippingInfoChange}
            />
          </Form.Item>
          <Form.Item label='Country'>
            <Input
              name='country'
              value={shippingInfo.country}
              onChange={handleShippingInfoChange}
            />
          </Form.Item>

          <PaymentForm />
        </Form>
      </Drawer>
    </>
  );
};
export default Item;
