const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

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
};
app.use(cors(corsOptions));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/categories', require('./routes/categoryRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/resources', require('./routes/resourcesRoutes'));

app.listen(port, () => {
    console.log(`Dev resources server is running on port ${port}`);
});
