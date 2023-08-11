const express = require('express');
const bodyParser = require('body-parser');
const flightRoute = require('./route/flight');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.use('/api', flightRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});