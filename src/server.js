import express from 'express';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import { ADMIN_APP, CLIENT_APP, DB_LINK, PORT } from './config/index.js';
import http from 'http';
import cookiePaser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

mongoose
    .connect(DB_LINK)
    .then(() => {
        console.info('Mongodb is connected');
        startServer();
    })
    .catch((error) => {
        console.error(`Unable to connect: ${error}`);
    });

const startServer = () => {
    var allowedDomains = ["http://localhost:3200", "http://localhost:3100"];
    app.use(cors({
        origin: function(origin, callback) {
            // bypass the requests with no origin (like curl requests, mobile apps, etc )
            if (!origin) return callback(null, true);

            if (allowedDomains.indexOf(origin) === -1) {
                var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
    }));
    app.use(cookiePaser());
    // app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    app.use(express.json());

    app.use(morgan('combined'));


    app.use('/api/v1', routes);

    /** Healthcheck */
    app.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));

    /** Error handling */
    app.use((req, res, next) => {
        const error = new Error('Not found');

        console.error(error);

        res.status(404).json({
            message: error.message,
        });
    });

    http.createServer(app).listen(PORT, () =>
        console.info(`Server is running on port ${PORT}`),
    );
};
