import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('List Kinights', async () => {
    return request(app.getHttpServer())
      .get('/api/knights')
      .expect(200)
      .expect('Content-Type', /json/)
  });

  it('Create Kinight', async () => {
    // Criar um novo cavaleiro
    const newKnightPayload = {
      name: 'Laurenti 1',
      nickname: 'simple_Knight',
      birthday: '1987-11-23',
      weapons: [
        {
          name: 'sword',
          mod: 3,
          attr: 'strength',
          equipped: false,
        },
        {
          name: 'gun2',
          mod: 4,
          attr: 'dexterity',
          equipped: true,
        },
      ],
      attributes: {
        strength: 1,
        dexterity: 2,
        constitution: 3,
        intelligence: 4,
        wisdom: 5,
        charisma: 5,
      },
      keyAttribute: 'strength',
    };

    await request(app.getHttpServer())
        .post('/api/knights')
        .send(newKnightPayload)
        .expect(201);
  });

  it('Get Kinight by ID', async () => {
    const knights = await request(app.getHttpServer())
        .get('/api/knights')
        .expect(200)
        .expect('Content-Type', /json/)

    const knightId = knights.body[0]._id

    const response = await request(app.getHttpServer())
        .get('/api/knights/' + knightId)
        .expect(200)
        .expect('Content-Type', /json/)

    expect(knightId).toBe(response.body._id)
  });

  it('Delete Knight (turn into a Hero)', async () => {
    const knights = await request(app.getHttpServer())
        .get('/api/knights')
        .expect(200)
        .expect('Content-Type', /json/)

    const knightId = knights.body[0]._id

    const response = await request(app.getHttpServer())
        .delete('/api/knights/' + knightId)
        .expect(200)
        .expect('Content-Type', /json/)

    expect(response.body.is_hero).toBe(true)
  });

  it('List Kinight (heroes)', async () => {
    const response = await request(app.getHttpServer())
        .get('/api/knights?is_hero=true')
        .expect(200)
        .expect('Content-Type', /json/)

    expect(response.body[0].is_hero).toBe(true)
  });

  it('Update Nickname of Knight', async () => {
    const knights = await request(app.getHttpServer())
        .get('/api/knights')
        .expect(200)
        .expect('Content-Type', /json/)

    const knightId = knights.body[0]._id

    const dataToUpdate = {
        nickname: 'New Nickname'
    }

    const response = await request(app.getHttpServer())
        .patch('/api/knights/' + knightId)
        .send(dataToUpdate)
        .expect(200)
        .expect('Content-Type', /json/)

    expect(response.body.nickname).toBe(dataToUpdate.nickname)
  });

});
