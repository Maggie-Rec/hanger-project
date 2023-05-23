import app from '../index';
import supertest from 'supertest';
import { deleteOne } from '../models/userModel';
import { deleteAddress } from '../models/addressModel';
import { deleteItem } from '../models/itemsModel';

let userId: string;
let addressId: string;
let token: string;
let itemId: string;
//comment delete

describe('registration', () => {
  it('should register a user', async () => {
    const res = await supertest.agent(app).post('/register').send({
      name: 'test1',
      email: 'test@mail1',
      userName: 'testUser1',
      password: 'testPass1',
    });
    // console.log('Registration response:', res.body);
    expect(res.status).toBe(201);
    userId = res.body._id;
  });

  it('should not register a user if the email is in use', async () => {
    const res = await supertest.agent(app).post('/register').send({
      name: 'test2',
      email: 'test@mail1',
      userName: 'testUser2',
      password: 'testPass2',
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Email already in use');
  });
});

describe('login', () => {
  it('should allow a user to log in with the registered email and password', async () => {
    const res = await supertest.agent(app).post('/login').send({
      email: 'test@mail1',
      password: 'testPass1',
    });
    // console.log('Login response:', res.body);
    expect(res.status).toBe(200);
    token = res.body.token;
  });

  it('should not allow a user to log in if e-mail or password is incorrect', async () => {
    const res = await supertest.agent(app).post('/login').send({
      email: 'test@mail2',
      password: 'testPass2',
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Login failed');
    expect(res.body.success).toBe(false);
  });
});

describe('address', () => {
  it('should allow a logged in user to add a address to their account', async () => {
    const res = await supertest
      .agent(app)
      .post('/add-address')
      .set('Authorization', `Bearer ${token}`)
      .send({
        houseNo: 123,
        streetName: 'test street',
        postCode: 'test postcode',
        city: 'test city',
      });
    // console.log('address response:', res.body);
    expect(res.status).toBe(201);
    addressId = res.body._id;
  });

  it('should NOT allow the same user to add another address to their account', async () => {
    const res = await supertest
      .agent(app)
      .post('/add-address')
      .set('Authorization', `Bearer ${token}`)
      .send({
        houseNo: 123,
        streetName: 'test street',
        postCode: 'test postcode',
        city: 'test city',
        user: userId,
      });
    console.log('address response adding another address:', res.body.status);
    expect(res.body.message).toEqual(
      expect.stringContaining('E11000 duplicate key error')
    );
  });
  it('should allow a logged in user to edit their address', async () => {
    const res = await supertest
      .agent(app)
      .put(`/update-address/${addressId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        houseNo: 1234,
        streetName: 'test street2',
        postCode: 'test postcode2',
        city: 'test city2',
      });
    // console.log('update address response:', addressId);
    expect(res.status).toBe(201);
  });
});

describe('Item Testing', () => {
  it('should add an item', async () => {
    const res = await supertest
      .agent(app)
      .post('/add-Item')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'test1',
        desc: 'test1',
        category: 'test1',
        condition: 'test1',
        price: 100,
        size: 'test1',
        img: 'test1',
      });
    expect(res.status).toBe(201);
    itemId = res.body._id;
  });

  it('should edit an item ', async () => {
    const res = await supertest
      .agent(app)
      .put(`/update-item/${itemId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        price: 9999,
      });
    expect(res.status).toBe(200);
  });

  it('should get all the items specific to a user', async () => {
    const res = await supertest
      .agent(app)
      .get(`/user-items/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it('should get all the items', async () => {
    const res = await supertest.agent(app).get('/get-Items');
    expect(res.status).toBe(200);
  });

  it('should delete an item', async () => {
    const res = await supertest.agent(app).delete(`/delete-item/${itemId}`);
    expect(res.status).toBe(201);
  });

  it('should not add an item without authentication', async () => {
    const res = await supertest.agent(app).post('/add-Item').send({
      title: 'test1',
      desc: 'test1',
      category: 'test1',
      condition: 'test1',
      price: 100,
      size: 'test1',
      img: 'test1',
    });
    expect(res.status).toBe(403);
  });

  it('should not edit an item with invalid ID', async () => {
    const res = await supertest
      .agent(app)
      .put('/update-item/invalidID')
      .set('Authorization', `Bearer ${token}`)
      .send({
        price: 9999,
      });
    expect(res.status).toBe(404);
  });

  it('should not get items specific to an invalid user', async () => {
    const res = await supertest
      .agent(app)
      .get('/user-items/invalidID')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });

  it('should not delete an invalid item', async () => {
    const res = await supertest.agent(app).delete('/delete-item/invalidID');
    expect(res.status).toBe(403);
  });

  afterAll(async () => {
    // console.log('Deleting user data for user ID:', userId);
    await deleteOne(userId);
    await deleteAddress(addressId);
    await deleteItem(itemId);
    // console.log('Result of deleteOne:', result);
  });
});
