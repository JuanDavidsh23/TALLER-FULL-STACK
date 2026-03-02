import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()


export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error conectando MongoDB:', error);
  }
};

