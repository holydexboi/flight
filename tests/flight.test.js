const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('../src/route/flight'); 

const app = express();
app.use(bodyParser.json());
app.use('/api', router);

describe('Flight API', () => {
  const mockFlights = [
    {
      id: 1,
      departureCity: 'City A',
      destinationCity: 'City B',
      departureDate: new Date(),
      availableSeats: 2,
    },
    
  ];

  let server;

  beforeEach(() => {
    jest.mock('./mockDatabase', () => ({
      flightsDB: mockFlights,
    }));
    server = app.listen();
  });

  afterEach(() => {
    server.close();
  });

  it('should retrieve available flights based on user input', async () => {
    const response = await request(server)
      .post('/api/flights')
      .send({ departureCity: 'City A', destinationCity: 'City B', departureDate: new Date() });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockFlights);
  });

  it('should not retrieve flights for invalid criteria', async () => {
    const response = await request(server)
      .post('/api/flights')
      .send({ departureCity: 'City X', destinationCity: 'City Y', departureDate: new Date() });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No available flights for the specified criteria.');
  });

  
});
