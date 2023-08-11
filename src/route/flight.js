const express = require('express');
const router = express.Router();

const flightsDB = require('../model/flight');
const bookingsDB = require('../model/booking');

function checkFlightAvailability(req, res, next) {
  const { departureCity, destinationCity, departureDate } = req.body;
  const availableFlights = flightsDB.filter(
    flight =>
      flight.departureCity === departureCity &&
      flight.destinationCity === destinationCity &&
      flight.departureDate.toISOString() === new Date(departureDate).toISOString()
  );
  if (availableFlights.length === 0) {
    return res.status(404).json({ message: 'No available flights for the specified criteria.' });
  }
  req.availableFlights = availableFlights;
  next();
}


router.post('/flights', checkFlightAvailability, (req, res) => {
  res.json(req.availableFlights);
});

router.post('/bookings', (req, res) => {
    const { user, flightId } = req.body;
    const flight = flightsDB.find(f => f.id === flightId);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found.' });
    }
    if (flight.availableSeats === 0) {
      return res.status(400).json({ message: 'No available seats for this flight.' });
    }
  
    
    const paymentSuccessful = Math.random() < 0.8;
    if (!paymentSuccessful) {
      return res.status(500).json({ message: 'Payment failed. Please try again.' });
    }
  
    const booking = { user, flightId };
    bookingsDB.push(booking);
    flight.availableSeats--;
    res.json({ message: 'Booking confirmed.', booking });
  });

module.exports = router;
