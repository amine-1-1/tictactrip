const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require("cors");
const errorHandler = require('./middelware/error');
const connectDB = require('./config/db');

//LOAD env vars
dotenv.config({
    path: './config/config.env'
});

//connect to database
connectDB();
//Route files
const auth = require('./routes/auth');
const justify = require('./routes/justify');
const startResetWordCountTask = require('./utils/resetWordCountTask');



const app = express();


// Add cors support
app.use(cors({
    origin: '*',
    credentials: true
}))





//Dev logging middleware

if ((process.env.NODE_ENV || '').trim() === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json())
app.use(express.text());

//Rate Limiting



// set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount routers
app.use('/api', auth);
app.use('/api/justify', justify);


app.use(errorHandler);

//@ docomentation
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API justify text',
        version: '1.0.0',
        description: 'API Description Here',
        contact: {
            name: 'My Name',
            email: 'My Email'
        },
    },
    servers: [{
        url: 'http://localhost:5000',
        description: 'Development server',
    }, ],
};
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));





const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in  ${process.env.NODE_ENV} mode on port ${PORT}`)
    startResetWordCountTask();
});



//Handel unhandel rejection
process.on('unhandledRejection', (err, Promise) => {
    console.log(`Error:${err.message}`);

    server.close(() => process.exit(1));
});
//
module.exports = server;