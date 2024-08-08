import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const DB_URI = process.env.DB_URI ?? '';

export const db = mongoose.createConnection(DB_URI, { maxPoolSize: 1000 });