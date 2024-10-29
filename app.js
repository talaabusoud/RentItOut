const express = require('express');
const cors = require('cors'); // CORS middleware
const dotenv = require('dotenv');
dotenv.config();

const itemRoutes = require('./routes/itemRoutes');
const externalAPIRoutes = require('./routes/externalAPIRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const userRoutes = require('./routes/userRoutes');
const deliveriesRouter = require('./routes/logisticsRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); // Ensure this path is correct

const errorHandler = require('./utils/errorHandler');
const sequelize = require('./config/database');

// Initialize the app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Route handlers
app.use('/api/items', itemRoutes);
app.use('/api/external', externalAPIRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/rentals', rentalRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/reviews', reviewRoutes); // Changed route path for reviews
app.use('/api/deliveries', deliveriesRouter);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Sync database and then start the server
const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Database synced successfully');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error syncing database:', err);
    process.exit(1); // Exit with failure
  }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await sequelize.close(); // Close database connection
  console.log('Database connection closed');
  process.exit(0); // Exit gracefully
});
