const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const costumeRoutes = require('./routes/costumes');
const rentalRoutes = require('./routes/rentals');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Melayani file statis dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Main Routes API
app.use('/api/costumes', costumeRoutes);
app.use('/api/rentals', rentalRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
