require('dotenv').config({ path: './key.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const { errors } = require('celebrate');
const routes = require('./routes');
const errorHandler = require('./utils/errors/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3000,
  DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const corsOptions = {
  origin: [
    'http://localhost:3000',
  ],
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
