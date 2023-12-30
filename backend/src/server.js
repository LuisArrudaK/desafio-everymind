require('dotenv').config({ path: '.env' });

const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const routes = require('./routes');
const server = express();

server.use(cors());
server.use(express.json());

server.use('/api', routes);
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running: http://localhost:${process.env.SERVER_PORT}`);
})