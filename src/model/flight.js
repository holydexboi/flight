const flightsDB = [
    {
        id: 1,
        departureCity: 'New York',
        destinationCity: 'Los Angeles',
        departureDate: new Date('2023-08-10'),
        availableSeats: 5,
      },
      {
        id: 2,
        departureCity: 'London',
        destinationCity: 'Paris',
        departureDate: new Date('2023-09-15'),
        availableSeats: 3,
      },
];

class Flight {
  constructor(departureCity, destinationCity, departureDate, availableSeats) {
    this.id = flightsDB.length + 1;
    this.departureCity = departureCity;
    this.destinationCity = destinationCity;
    this.departureDate = departureDate;
    this.availableSeats = availableSeats;
    this.details = {};
  }
}


module.exports = Flight
