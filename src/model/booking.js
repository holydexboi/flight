const bookingsDB = [
    {
        id: 1,
        user: 'John Doe',
        flightId: 1,
        bookingDate: new Date('2023-07-20'),
      },
      {
        id: 2,
        user: 'Jane Smith',
        flightId: 2,
        bookingDate: new Date('2023-07-25'),
      },
];

class Booking {
  constructor(user, flightId) {
    this.id = bookingsDB.length + 1;
    this.user = user;
    this.flightId = flightId;
    this.bookingDate = new Date();
    this.details = {};
  }
}

module.exports = Booking;
