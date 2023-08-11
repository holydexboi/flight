const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./bookingRoute'); 

const app = express();
app.use(bodyParser.json());
app.use('/api', router);

describe('Booking API', () => {
  const mockFlight = {
    id: 1,
    departureCity: 'City A',
    destinationCity: 'City B',
    departureDate: new Date(),
    availableSeats: 2,
  };

  const mockFlightsDB = [mockFlight];

  let mockBookingsDB = [];
  let server;

  beforeAll(() => {
    jest.mock('./mockDatabase', () => ({
      flightsDB: mockFlightsDB,
      bookingsDB: mockBookingsDB,
    }));
  });

  beforeEach(() => {
    mockBookingsDB = [];
    server = app.listen();
  });

  afterEach(() => {
    server.close();
  });

  it('should book a flight successfully', async () => {
    const response = await request(server)
      .post('/api/bookings')
      .send({ user: 'John Doe', flightId: mockFlight.id });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Booking confirmed.');
    expect(mockBookingsDB.length).toBe(1);
    expect(mockFlightsDB[0].availableSeats).toBe(1);
  });

  it('should fail to book a flight due to payment failure', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.9); // Mock payment failure

    const response = await request(server)
      .post('/api/bookings')
      .send({ user: 'Jane Smith', flightId: mockFlight.id });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Payment failed. Please try again.');
    expect(mockBookingsDB.length).toBe(0);
    expect(mockFlightsDB[0].availableSeats).toBe(2);

    jest.spyOn(Math, 'random').mockRestore();
  });


});
