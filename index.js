const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Developer Resources API',
      version: '1.0.0',
      description: 'A Developer Resources API',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
const specs = swaggerJsdoc(options);


const connectDB = require('./config/db');
const port = process.env.PORT || 5001;

connectDB();

const app = express();
const corsOptions = {
    origin: 'http://localhost:5001',
    optionsSuccessStatus: 204,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use('/api/', limiter);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/categories', require('./routes/categoryRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/resources', require('./routes/resourcesRoutes'));

const listenAddress = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
app.listen(port, listenAddress, () => {
   console.log(`Dev resources server is running on ${listenAddress} on port ${port}`);
});


