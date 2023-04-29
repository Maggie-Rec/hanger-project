import app from '../index';
import supertest from 'supertest';

let token: string;
let userId: string;
let itemId: string;

describe('Item Testing', () => {
    it('should register a user', async () => {
        const res = await supertest.agent(app).post('/register').send({
            name: 'jest',
            email: 'test@mail5',
            userName: 'testUser1',
            password: 'testPass1',
        });
        // console.log('Registration response:', res.body);
        expect(res.status).toBe(201);
        userId = res.body._id;
    });

    it('should login a user', async () => {
        const res = await supertest.agent(app).post('/login').send({
            email: 'test@mail5',
            password: 'testPass1',
        });
        expect(res.status).toBe(200);
        userId = res.body.user._id;
        token = res.body.token;
    });

    it('should add an item', async () => {
        const res = await supertest.agent(app)
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
    })

    it('should edit an item ', async () => {
        const res = await supertest.agent(app)
            .put(`/update-item/${itemId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                price: 9999,
            });
        expect(res.status).toBe(200);
    })

    it('should get all the items specific to a user', async () => {
        const res = await supertest.agent(app)
            .get(`/user-items/${userId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    })

    it('should get all the items', async () => {
        const res = await supertest.agent(app).get('/get-Items');
        expect(res.status).toBe(200);
    })

    it('should delete an item', async () => {
        const res = await supertest.agent(app).delete(`/delete-item/${itemId}`);
        expect(res.status).toBe(201);
    })

    it('should not add an item without authentication', async () => {
        const res = await supertest.agent(app)
            .post('/add-Item')
            .send({
                title: 'test1',
                desc: 'test1',
                category: 'test1',
                condition: 'test1',
                price: 100,
                size: 'test1',
                img: 'test1',
            });
        expect(res.status).toBe(403);
    })
    
    it('should not edit an item with invalid ID', async () => {
        const res = await supertest.agent(app)
            .put('/update-item/invalidID')
            .set('Authorization', `Bearer ${token}`)
            .send({
                price: 9999,
            });
        expect(res.status).toBe(404);
    })
    
    it('should not get items specific to an invalid user', async () => {
        const res = await supertest.agent(app)
            .get('/user-items/invalidID')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(404);
    })
    
    it('should not delete an invalid item', async () => {
        const res = await supertest.agent(app).delete('/delete-item/invalidID');
        expect(res.status).toBe(403);
    })
    
})
