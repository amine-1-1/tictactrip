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
        description: 'this Api is done for the purpose of a technical test for tictactrip deliverables.\n * La longueur des lignes du texte justifié doit être de 80 caractères.\n * L’endpoint doit être de la forme /api/justify et doit retourner un texte justifié suite à une requête POST avec un body de ContentType text/plain \n * L’api doit utiliser un mécanisme d’authentification via token unique. En utilisant par exemple une endpoint api/token qui retourne un token d’une requête POST avec un json body {"email": "foo@bar.com"}.\n * Il doit y avoir un rate limit par token pour l’endpoint /api/justify, fixé à 80 000 mots par jour, si il y en a plus dans la journée il faut alors renvoyer une erreur 402 Payment Required.',
        contact: {
            name: ' Mouhamed Amine Zaddem',
            email: 'aminezaddem20@gmail.com'
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