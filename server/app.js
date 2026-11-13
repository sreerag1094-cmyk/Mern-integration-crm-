require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/UserRoutes');
const customerRoutes = require('./routes/CustomerRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, '') : null;
const allowedOrigins = ['http://localhost:5173', process.env.CLIENT_URL, clientUrl].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'CRM API running' }));
app.use('/api/auth', userRoutes);
app.use('/api/customers', customerRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
