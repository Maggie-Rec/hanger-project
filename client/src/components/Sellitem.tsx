import React from 'react';
import './Sellitem.css';
import { useState } from 'react';
import { Textarea, Input, Select, Option } from '@material-tailwind/react';
import { PostItemFunction } from '../apiService';

const Item: React.FC = () => {
  const [titleInput, setTitleInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [priceInput, setPriceInput] = useState(0);
  const [condInput, setCondInput] = useState('');
  const [catInput, setCatInput] = useState('');
  const [sizeInput, setSizeInput] = useState('');
  const [itemImage, setItemImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleUploadBtn = async (e) => {
    e.preventDefault();
    const formItem = {
      img: imageUrl,
      title: titleInput,
      desc: descInput,
      price: Number(priceInput),
      condition: condInput,
      category: catInput,
      size: sizeInput,
    };

    await PostItemFunction(formItem);
    setCatInput('');
    setCondInput('');
    setDescInput('');
    setPriceInput(0);
    setTitleInput('');
    setSizeInput('');
    setImageUrl('');
    setItemImage(null);
  };

  const uploadImage = () => {
    const data = new FormData();
    data.append('file', itemImage);
    data.append('upload_preset', 'reactHanger');
    data.append('cloud_name', 'dgwarr7v8');
    fetch('https://api.cloudinary.com/v1_1/dgwarr7v8/image/upload', {
      method: 'post',
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setImageUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <div>
          <input
            type='file'
            onChange={(e) => setItemImage(e.target.files?.[0] || null)}
          />
          <button
            className='bg-orange-700 p-2 rounded-xl font-semibold text-white'
            onClick={uploadImage}
          >
            Upload Image
          </button>
        </div>
        <div>
          <h1>Uploaded image will be displayed below</h1>
          <img src={imageUrl} />
        </div>
      </div>
      <form className='mt-10 flex mb-10'>
        <div className='flex flex-col mr-10 gap-6'>
          <Input
            value={titleInput}
            label='Title'
            className='bg-white  '
            onChange={(e) => setTitleInput(e.target.value)}
            onResize={undefined}
            onResizeCapture={undefined}
          />
          <Textarea
            value={descInput}
            label='Description...'
            className='bg-white '
            onChange={(e) => setDescInput(e.target.value)}
            onResize={undefined}
            onResizeCapture={undefined}
          />
        </div>
        <div className='flex flex-col gap-6'>
          <div className='flex items-baseline'>
            <h1 className='mr-1'>£</h1>
            <Input
              value={priceInput}
              label='Price'
              type='number'
              className='mb-5 bg-white '
              onChange={(e) => setPriceInput(parseInt(e.target.value))}
              onResize={undefined}
              onResizeCapture={undefined}
            />
          </div>
          <Select
            label='Select Size'
            value={sizeInput}
            className='mb-5 bg-white '
            onChange={(e) => setSizeInput(e)}
            onResize={undefined}
            onResizeCapture={undefined}
          >
            <Option value='S'>S</Option>
            <Option value='M'>M</Option>
            <Option value='L'>L</Option>
            <Option value='XL'>XL</Option>
            <Option value='XXL'>XXL</Option>
            <Option value='0-3YO'>0-3YO</Option>
            <Option value='4-6YO'>4-6YO</Option>
            <Option value='7-9YO'>7-9YO</Option>
            <Option value='10-12YO'>10-12YO</Option>
          </Select>

          <Select
            label='Select Category'
            value={catInput}
            className='mb-5 bg-white '
            onChange={(e) => setCatInput(e)}
            onResize={undefined}
            onResizeCapture={undefined}
          >
            <Option value='Men'>Men</Option>
            <Option value='Women'>Women</Option>
            <Option value='Kids'>Kids</Option>
          </Select>

          <Select
            value={condInput}
            label='Condition'
            className='bg-white'
            onChange={(e) => setCondInput(e)}
            onResize={undefined}
            onResizeCapture={undefined}
          >
            <Option value='New'>New</Option>
            <Option value='Like New'>Like New</Option>
            <Option value='Good'>Good</Option>
            <Option value='Used'>Used</Option>
          </Select>
        </div>
      </form>
      <button
        className='bg-green-900 rounded-lg p-3 px-20 text-white'
        onClick={handleUploadBtn}
      >
        Upload
      </button>
    </>
  );
};

export default Item;
