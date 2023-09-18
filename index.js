const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/categories', require('./routes/categoryRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/resources', require('./routes/resourcesRoutes'));

app.listen(port, () => {
    console.log(`Dev resources server is running on port ${port}`);
});
