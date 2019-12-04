const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running!'));

// Define Routes

app.use('/api/account', require('./routes/api/account'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    