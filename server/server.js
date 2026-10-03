import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';



import authRoutes from './routes/auth.js'; 
import productRoute from './routes/productDetails.js'
import userProfile from './routes/profile.js'
import rewearProductsRoute from './routes/rewearProducts.js';
import orderRoute from './routes/order.js';
import swapRequestRoute from './routes/swapRequest.js';
dotenv.config();

import './models/db.js'

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/api/rewear-products', rewearProductsRoute);
app.use('/api/orders', orderRoute);
// Routes
app.get('/', (req, res) => {
  res.send(`ReWear backend is running on port ${PORT}`);
});

// Middleware

app.use("/api/auth", authRoutes);
app.use("/", productRoute);
app.use('/api/',userProfile)
app.use('/api/swap-requests', swapRequestRoute);
// MongoDB connection

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
