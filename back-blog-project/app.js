const express = require('express');

//документация
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const jsonParser = express.json();
const cors = require('cors');

const router = require("./routers/index");


const start = async () => {
    try{
        const app = express();

        const corsOptions = {
            origin: true,
            credentials: true,
            optionSuccessStatus: 200
        }
        app.use(cors(corsOptions));

        //пути
        app.use("/", router);

        //документация
        app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

        const port = 5000;
        const host = "localhost";

        app.listen(port, host, function () {
            console.log('Server listens http://' + host + ':'+ port);
        });

    } catch (error){
        console.log('Enable to start a server: ', error);
    }
}

start();