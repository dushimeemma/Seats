import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config/config';
import authRoutes from './routes/auth';
import studentRoutes from './routes/student';
import seatRoutes from './routes/seats';

const app = express();
app.use(express.json());
app.use(cors());

const { name, host, dbPort } = config[process.env.NODE_ENV];
const db =
  config[process.env.NODE_ENV].mongoURI ||
  `mongodb://${host}:${dbPort}/${name}`;

const connectDB = async () => {
  const con = await mongoose.connect(db, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('MongoDB connected successfully');
  return con;
};
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/seats', seatRoutes);

app.use('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    msg: 'Welcome To EXAM SEATS ARRANGEMENT SYSTEM',
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port:${port}`));

export default app;
